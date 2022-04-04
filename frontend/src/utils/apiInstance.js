import axios from 'axios';

const API_BASE_URL = 'http://j6b204.p.ssafy.io:8070/api/v1';

const apiInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-type': 'application/json',
  },
});
apiInstance.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem(
  'Authorization',
)}`;

export default apiInstance;
