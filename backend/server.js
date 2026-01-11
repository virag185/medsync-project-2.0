

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Firebase service account
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const app = express();
app.use(cors());
app.use(express.json());



// Health check
app.get('/', (req, res) => {
  res.send('MedSync backend with Firebase is running');
});

// =====================================
// POST /api/log-dose  (CORE FEATURE)
// =====================================
app.post('/api/log-dose', async (req, res) => {
  const { patient_id } = req.body;

  if (!patient_id) {
    return res.status(400).json({ error: 'patient_id is required' });
  }

  try {
    const patientRef = db.collection('patients').doc(patient_id);
    const patientSnap = await patientRef.get();

    if (!patientSnap.exists) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    const patientData = patientSnap.data();

    const updatedPillsLeft =
      patientData.pills_left - patientData.daily_dosage;

    await patientRef.update({
      pills_left: updatedPillsLeft,
      status: 'Taken',
      last_taken_date: admin.firestore.FieldValue.serverTimestamp(),
    });

    await db.collection('logs').add({
      patient_id: patient_id,
      action: 'Taken',
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
      reason: null,
    });

    res.json({ message: 'Dose logged successfully' });
  } catch (error) {
    console.error('Error logging dose:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// =====================================
// START SERVER (MUST BE LAST)
// =====================================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
