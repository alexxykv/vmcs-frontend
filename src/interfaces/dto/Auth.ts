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

export interface JWTData {
  token: string
  expiration: string
}

export type AuthStatusType = 'Anonymous' | 'Authorized';