export interface RegisterResponse {
  token: string,
  expiration: string
}

export interface LoginResponse extends RegisterResponse { }

export type WhoAmIType = 'Anonymous' | 'Authorized';