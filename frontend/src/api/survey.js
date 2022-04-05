import apiInstance from '../utils/apiInstance';

/* 가입 후 최초 설문 */
export function submitSurvey(survey, success, fail) {
  apiInstance
    .post('kkubooks/survey/', { ...survey })
    .then(success)
    .catch(fail);
}

/* 기분 정보 저장 */
export function submitFeeling(feeling, success, fail) {
  apiInstance
    .put('kkubooks/survey/feeling/', { feeling })
    .then(success)
    .catch(fail);
}

/* 기분 정보 불러오기 */
export async function getFeeling() {
  try {
    const response = await apiInstance.get('kkubooks/survey/feeling/');
    return response.data.feeling;
  } catch (error) {
    return error;
  }
}
