import axios from 'axios';

const addTokenToAxiosInterceptor = (token) => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default addTokenToAxiosInterceptor;