export interface IUserData {
  token: string;
  user_id: number;
  user_type: number;
  first_name: string;
  last_name: string;
  email: string;
  review_done: boolean;
  business_name: string;
  profile_pic: string;
}

export interface ILoginApiParam {
  email: string;
  password: string;
  deviceId: string;
  deviceType: string;
  fcmToken: string;
}
