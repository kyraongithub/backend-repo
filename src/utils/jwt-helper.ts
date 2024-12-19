import jwt from 'jsonwebtoken'
import { REFRESH_LIMIT, ACCESS_LIMIT } from '@/config/jwt.config'

const jwtToken = (
  id_karyawan: string,
  nama_pengguna: string,
  email: string,
  nomor_telepon: string,
  id_perusahaan: string,
  avatar: string,
  id: string,
  permission: string[]
) => {
  const user = { id_karyawan, nama_pengguna, email, nomor_telepon, id_perusahaan, id, avatar, permission }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_LIMIT })
  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: REFRESH_LIMIT })
  return { accessToken, refreshToken, ...user }
}

export { jwtToken }
