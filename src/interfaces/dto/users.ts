export interface UserData {
  id: string
  login: string
  username: string
  email: string
}

export interface ShortUserData {
  id: string
  username: string
}

export interface ChangeUserData {
  username: string
  email: string
}