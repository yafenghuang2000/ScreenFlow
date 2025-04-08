import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  userinfo: () => {
    return {
      username: 'admin',
      password: '123456',
      token: '123456',
    };
  },
});

const whitelist = ['userinfo'];

export { rootReducer, whitelist };
