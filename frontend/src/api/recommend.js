import apiInstance from '../utils/apiInstance';

// 사용자 기반 추천 목록
export async function getUserBooks() {
  try {
    const response = await apiInstance.get('kkubooks/recommend/userbased/');
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      return [];
    }
    return error;
  }
}

// 베스트셀러
export async function getBestBooks() {
  try {
    const response = await apiInstance.get('kkubooks/recommend/best/');
    return response.data;
  } catch (error) {
    return error;
  }
}

// 나와 비슷한 사용자가 읽은 책
export async function getSimilarBooks() {
  try {
    const response = await apiInstance.get('kkubooks/recommend/similar/');
    return response.data;
  } catch (error) {
    if (error.response.status === 404) {
      return [];
    }
    return error;
  }
}

// 기분에 따른 책 추천
export async function getFeelingBooks() {
  try {
    const response = await apiInstance.get('kkubooks/recommend/feeling/');
    return response.data;
  } catch (error) {
    return error;
  }
}
