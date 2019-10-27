import axios from 'axios';
import methods from './methods';
import { BackendUrl, DeveloperTag } from '../constants/api';

const options = {
  baseURL: BackendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const defaultParams = {
  developer: DeveloperTag,
};

const APIContext = axios.create(options);

APIContext.interceptors.request.use(
  function(config) {
    return {
      ...config,
      params: {
        ...config.params,
        ...defaultParams,
      },
    };
  },
  function(error) {
    return Promise.reject(error);
  }
);

function setAPIToken() {
  APIContext.defaults.headers.common(['Authorization']);
}

export const API = {
  context: APIContext,
  methods,
  helpers: {
    setAPIToken,
  },
};
