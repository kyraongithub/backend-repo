import { Request, Response } from 'express'
import { DBauthLogin } from '../repository/auth.repository'

export const loginRequest = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body
    const { err, result } = await DBauthLogin({ username, password }, res)
    if (err) {
      return res.status(400).json({ status: false, statusCode: 400, message: err.message })
    }
    return res.status(200).json({ status: true, statusCode: 200, message: 'Login success!', user: result })
  } catch (error) {
    console.error('Error:', error)
    return res.status(500).json({ status: false, statusCode: 500, message: error.message })
  }
}

export const logoutRequest = async (req: Request, res: Response) => {
  try {
    res.clearCookie('refresh_token')
    return res.status(200).json({ status: true, statusCode: 200, message: 'logout success' })
  } catch (error) {
    return res.status(401).json({ status: false, statusCode: 401, message: error.message })
  }
}
