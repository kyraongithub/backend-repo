import * as admin from 'firebase-admin'

const serviceAccount: any = require('./firebase.json')
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()
const auth = admin.auth()

export { admin, db, auth }
