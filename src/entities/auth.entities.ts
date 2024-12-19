export interface User {
  id: string
  firstName: string
  lastName: string
  email: string

  getFullName(): string
  isValidEmail(): boolean
}
