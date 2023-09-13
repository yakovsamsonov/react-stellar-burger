import { registerUser } from '../../utils/burger-api';
import { setCookie } from '../../utils/cookie';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export function registerNewUser(user) {
  return function (dispatch) {
    dispatch({
      type: REGISTER_USER_REQUEST,
    });
    return registerUser(user)
      .then((d) => {
        if (d.success) {
          setCookie('accessToken', d.accessToken.split('Bearer ')[1]);
          setCookie('refreshToken', d.refreshToken);
          dispatch({
            type: REGISTER_USER_SUCCESS,
            user: d.user,
          });
        }
      })
      .catch((e) => {
        dispatch({
          type: REGISTER_USER_FAILED,
          errorMessage: e.message,
        });
      });
  };
}
