export interface RegisterUser {
  name: string,
  email: string,
  password: string,
  category: number[],
  message?: string
}
