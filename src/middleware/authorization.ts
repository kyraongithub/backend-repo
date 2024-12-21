import { NextFunction, Response } from 'express'
import { auth } from '../config/firebase.config'

const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) {
    return res.status(401).json({ status: false, statusCode: 401, message: 'Unauthorized' })
  }

  try {
    const decodedToken = await auth.verifyIdToken(token, false)
    req.user = decodedToken
    next()
  } catch (error) {
    console.error('Error verifying token:', error)
    return res.status(403).json({ status: false, statusCode: 403, message: `Forbidden: ${error.message}` })
  }
}

// const verifyToken = async (req: any, res: Response, next: NextFunction) => {
//   next()
// }

export { verifyToken }
