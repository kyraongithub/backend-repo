import { Response } from 'express'
import { auth, db } from '../config/firebase.config'
import { User } from '../entities/user.entities'
import { checkPassword, hashing } from '../utils/hashing'
import { jwtToken } from '../utils/jwt-helper'

type userInput = {
  username: string
  password: string
}

const DBauthLogin = async (
  { username, password }: Pick<userInput, 'username' | 'password'>,
  res: Response
): Promise<{ err?: Error; result?: User }> => {
  try {
    const usersSnapshot = await db.collection('users').where('username', '==', username).get()

    if (usersSnapshot.empty) {
      return { err: new Error('User not found') }
    }

    const userDoc = usersSnapshot.docs[0]
    const userData = userDoc.data() as User
    const isPasswordMatch = checkPassword(password, userData.password)

    if (!isPasswordMatch) {
      return { err: new Error('Invalid password') }
    }
    const userLogin: User = jwtToken(userData.username, userData.name)
    res.cookie('refresh_token', userLogin.refreshToken, { httpOnly: true, secure: true })

    return { result: userLogin }
  } catch (error) {
    console.error('Error during login:', error)
    return { err: new Error('Login failed') }
  }
}

const ChangePassword = async (oldPassword: string, newPassword: string, userId: string): Promise<{ err?: Error }> => {
  try {
    const user = await auth.getUser(userId)
    // @ts-ignore
    const isOldPasswordCorrect = await auth.verifyPassword(user.uid, oldPassword)

    if (!isOldPasswordCorrect) {
      return { err: new Error('Invalid old password') }
    }

    const hashedNewPassword = hashing(newPassword)

    await auth.updateUser(user.uid, { password: hashedNewPassword })

    return {}
  } catch (error) {
    console.error('Error changing password:', error)
    return { err: new Error('Failed to change password') }
  }
}

export { ChangePassword, DBauthLogin }
