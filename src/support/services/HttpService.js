import axios from 'axios';

const HttpService = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

export default HttpService;
