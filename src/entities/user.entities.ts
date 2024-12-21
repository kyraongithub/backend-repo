export interface User {
  id?: string
  username: string
  email: string
  name: string
  password?: string
  created_at?: string
  updated_at?: string
  refreshToken?: string
  accessToken?: string
}
