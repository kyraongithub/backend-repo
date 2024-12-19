import * as admin from 'firebase-admin'
import { User } from '@/entities/auth.entities'

const db = admin.firestore()
const usersCollection = db.collection('USERS')

const UpdateUserData = async (userId: string, updatedData: Partial<User>): Promise<User> => {
  try {
    await usersCollection.doc(userId).update(updatedData)
    const updatedUserDoc = await usersCollection.doc(userId).get()
    return { id: userId, ...updatedUserDoc.data() } as User
  } catch (error) {
    console.error('Error updating user data:', error)
    throw error
  }
}

const FetchUserData = async (userId: string): Promise<User | null> => {
  try {
    const userDoc = await usersCollection.doc(userId).get()
    if (userDoc.exists) {
      return { id: userDoc.id, ...userDoc.data() } as User
    } else {
      return null
    }
  } catch (error) {
    console.error('Error fetching user data:', error)
    throw error
  }
}

export { UpdateUserData, FetchUserData }
