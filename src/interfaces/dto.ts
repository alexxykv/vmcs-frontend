export interface RegisterData {
  username: string,
  login: string,
  password: string,
  email: string
}

export interface LoginData {
  login: string
  password: string
}

export interface ShortMessageData {
  id: string
  username: string
  text: string
}