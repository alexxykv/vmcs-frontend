import { UserData } from './dto/users'

export interface UserState {
  loggedIn: boolean
  data?: UserData
}