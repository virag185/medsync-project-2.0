const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function addTestPatient() {
  try {
    await db.collection('patients').doc('patient_001').set({
      name: 'Test Patient',
      daily_dosage: 1,
      pills_left: 30,
      status: 'Good',
      last_taken_date: null,
    });

    console.log('✅ Test patient added successfully');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error adding patient:', error);
    process.exit(1);
  }
}

addTestPatient();
