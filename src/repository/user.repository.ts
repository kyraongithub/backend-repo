import { db } from '../config/firebase.config'
import { User } from '../entities/user.entities'

const usersCollection = db.collection('users')

const FetchUserData = async (): Promise<User[] | null> => {
  try {
    const usersSnapshot = await usersCollection.get()
    const users: User[] = []

    usersSnapshot.forEach((doc) => {
      const userData = doc.data()
      users.push({
        id: doc.id,
        name: userData.name,
        email: userData.email,
        created_at: userData.created_at
      } as User)
    })

    return users
  } catch (error) {
    console.error('Error fetching all users data:', error)
    throw error
  }
}

const CreateUserData = async (userData: User): Promise<User> => {
  try {
    const userDoc = await usersCollection.add(userData)
    return {
      id: userDoc.id,
      name: userData.name,
      email: userData.email,
      created_at: userData.created_at
    } as User
  } catch (error) {
    console.error('Error creating user data:', error)
    throw error
  }
}

const UpdateUserData = async (userId: string, updatedData: Partial<User>): Promise<User> => {
  try {
    await usersCollection.doc(userId).update(updatedData)
    const updatedUserDoc = await usersCollection.doc(userId).get()
    const updatedUserData = updatedUserDoc.data()
    return {
      id: userId,
      name: updatedUserData.name,
      email: updatedUserData.email,
      created_at: updatedUserData.created_at
    } as User
  } catch (error) {
    console.error('Error updating user data:', error)
    throw error
  }
}

const DeleteUserData = async (userId: string): Promise<void> => {
  try {
    await usersCollection.doc(userId).delete()
  } catch (error) {
    console.error('Error deleting user data:', error)
    throw error
  }
}
export { FetchUserData, CreateUserData, UpdateUserData, DeleteUserData }
