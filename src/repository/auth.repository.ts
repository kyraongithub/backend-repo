import { Response } from 'express'
import { db } from '../config/firebase.config'
import { User } from '../entities/user.entities'
import { checkPassword } from '../utils/hashing'
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

export { DBauthLogin }
