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

/* 닉네임 변경 */
export function changeNickname(nickname, success, fail) {
  apiInstance.put('accounts/', { nickname }).then(success).catch(fail);
}

/* 회원 탈퇴 */
export function signout(success, fail) {
  apiInstance.delete('accounts/').then(success).catch(fail);
}

/* 꾸북모드 켜기 */
export function onKkubookMode(success, fail) {
  apiInstance.post('kkubooks/mypage/kkubookmode/').then(success).catch(fail);
}

/* 꾸북모드 끄기 */
export function offKkubookMode(success, fail) {
  apiInstance.delete('kkubooks/mypage/kkubookmode/').then(success).catch(fail);
}

/* 독서량&장르 통계 가져오기 */
export function getUserStatistics(date, success, fail) {
  apiInstance
    .get(`kkubooks/mypage/statistics/${date}/`)
    .then(success)
    .catch(fail);
}
