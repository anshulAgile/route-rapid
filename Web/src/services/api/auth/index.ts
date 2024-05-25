import { IApiSuccess } from '../../../utils/Types';
import { ApiEndPoints } from '../../../utils/constants';

import apiInstance from '..';
import { ISignInReq, ISignInRes } from './types';

export const authAPI = {
  // SignIn
  async signIn(data: ISignInReq): Promise<IApiSuccess<ISignInRes>> {
    return apiInstance.post(ApiEndPoints.auth.signIn, data);
  },
};
