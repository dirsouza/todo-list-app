import axios from 'axios';

const HttpService = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

HttpService.interceptors.request.use(/* istanbul ignore next */ (config) => {
  const configure = config;

  configure.headers['Accept-Language'] = process.env.VUE_APP_I18N_LOCALE;

  return configure;
});

export default HttpService;
