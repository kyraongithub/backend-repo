import jwt from 'jsonwebtoken'
import { REFRESH_LIMIT, ACCESS_LIMIT } from '../config/jwt.config'
import { User } from '../entities/user.entities'

const jwtToken = (username: string, name: string) => {
  const user: User = { username, name }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_LIMIT })
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_LIMIT })
  return { accessToken, refreshToken, ...user }
}

export { jwtToken }
