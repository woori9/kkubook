import apiInstance from '../utils/apiInstance';

export function apiSearchBook({ word, index }, success, fail) {
  apiInstance
    .get(`kkubooks/main/search/?word=${word}&index=${index}`)
    .then(success)
    .catch(fail);
}

export function getBookCommit(success, fail) {
  apiInstance.get('kkubooks/main/commits').then(success).catch(fail);
}
