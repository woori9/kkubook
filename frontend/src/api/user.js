import apiInstance from '../utils/apiInstance';

const formUrlEncoded = x =>
  Object.keys(x).reduce((p, c) => `${p}&${c}=${encodeURIComponent(x[c])}`, '');

/* 카카오 토큰 받아오기 */
export function getToken(data, success, fail) {
  apiInstance
    .post('https://kauth.kakao.com/oauth/token', formUrlEncoded(data), {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        Authorization: process.env.REACT_APP_ADMIN_KEY,
      },
    })
    .then(success)
    .catch(fail);
}

/* 유저 정보 받아오기 */
export function getUserInfo(accessToken, success, fail) {
  apiInstance
    .post('accounts/kakao/login/', { access_token: accessToken })
    .then(success)
    .catch(fail);
}

/* 회원 탈퇴 */
export function signout(success, fail) {
  apiInstance.delete('accounts/').then(success).catch(fail);
}
