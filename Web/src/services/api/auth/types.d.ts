export interface ISignInReq {
  email: string;
  password: string;
}

export interface ISignInRes{
  token: string
  expiration: string
  role: string
}

