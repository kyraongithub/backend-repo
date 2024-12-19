import * as admin from 'firebase-admin'
// data is not fixed yet
const serviceAccount = require('@/serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
const auth = admin.auth()

export { admin, db, auth }
