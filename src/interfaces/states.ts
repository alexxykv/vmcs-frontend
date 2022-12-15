import { UserData } from './dto'

export interface UserState {
  loggedIn: boolean
  data?: UserData
}