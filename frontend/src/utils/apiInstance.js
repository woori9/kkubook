import axios from 'axios';

// export const API_BASE_URL = 'http://localhost:8000';
export const API_BASE_URL = 'http://j6b204.p.ssafy.io:8070';

const apiInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  headers: {
    'Content-type': 'application/json',
  },
});
apiInstance.defaults.headers.common.Authorization = `Bearer ${sessionStorage.getItem(
  'Authorization',
)}`;

export default apiInstance;
