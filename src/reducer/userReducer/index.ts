import { userActionType } from './type';
export const saveUserInfoAction = (payload: unknown): unknown => {
  return {
    type: userActionType.saveUserinfo,
    payload,
  };
};
