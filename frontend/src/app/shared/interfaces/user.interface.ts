export interface User {
  user: InformationUser,
  access_token: string,
  tokenType: string
}

export interface InformationUser {
  userId: string,
  username: string
}
