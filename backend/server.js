require('dotenv').config();
const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

const app = express();
app.use(cors());
app.use(express.json());

// 🔥 Firebase init
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

/* =========================
   HEALTH CHECK
========================= */
app.get('/', (req, res) => {
  res.send('MedSync backend running');
});

/* =========================
   GET PATIENTS
========================= */
app.get('/api/patients', async (req, res) => {
  const snapshot = await db.collection('patients').get();
  const patients = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  res.json(patients);
});

/* =========================
   LOG DOSE (CRITICAL)
========================= */
app.post('/api/log-dose', async (req, res) => {
  console.log('LOG DOSE BODY:', req.body);

  const { patient_id } = req.body;
  if (!patient_id) {
    return res.status(400).json({ error: 'patient_id missing' });
  }

  const ref = db.collection('patients').doc(patient_id);
  const snap = await ref.get();

  if (!snap.exists) {
    return res.status(404).json({ error: 'Patient not found' });
  }

  const data = snap.data();

  await ref.update({
    pills_left: data.pills_left - data.daily_dosage,
    status: 'Taken',
    taken_today: true,
    last_taken_date: admin.firestore.Timestamp.now(),
  });

  res.json({ message: 'Dose logged' });
});

/* =========================
   DAILY RESET
========================= */
app.get('/api/daily-reset', async (req, res) => {
  const snapshot = await db.collection('patients').get();
  let count = 0;

  for (const doc of snapshot.docs) {
    await doc.ref.update({
      taken_today: false,
      status: 'MISSED',
    });
    count++;
  }

  res.json({ message: 'Daily reset completed', patients_reset: count });
});

/* ========================= */
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
