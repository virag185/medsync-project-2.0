const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

async function resetPatient() {
  await db.collection("patients").doc("patient_001").set({
    name: "Justin Hatch",      // ✅ patient name
    daily_dosage: 1,
    pills_left: 30,
    status: "MISSED",          // 🔴 FORCE RED
    last_taken_date: null      // ❌ no time
  });

  console.log("✅ Patient reset to MISSED");
}

resetPatient();
