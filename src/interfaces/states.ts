import { UserData } from './dto/users'

export interface UserState {
  loggedIn: boolean
  data?: UserData
}

export interface JWTState {
  token: string
  expiration: string
}