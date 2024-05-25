export interface ISignInReq {
  email: string;
  password: string;
}

export interface ISignInRes {
  _id: string;
  authToken: string;
}
