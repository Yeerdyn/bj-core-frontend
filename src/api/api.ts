import axios from 'axios';
import methods from './methods';
import { BackendUrl, DeveloperTag } from '../constants/api';
import { getAccessToken } from 'src/utilities/authOperations';

const authBlacklist = ['/', '/create'];

const options = {
  baseURL: BackendUrl,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const defaultParams = {
  developer: DeveloperTag,
};

export const defaultHeaders = {
  Authorization: getAccessToken(),
};

const APIContext = axios.create(options);

APIContext.interceptors.request.use(
  function(config) {
    const updatedHeaders =
      authBlacklist.includes(String(config.url)) || !getAccessToken()
        ? config.headers
        : {
            ...config.headers,
            ...defaultHeaders,
          };

    return {
      ...config,
      params: {
        ...config.params,
        ...defaultParams,
      },
      headers: updatedHeaders,
    };
  },
  function(error) {
    return Promise.reject(error);
  }
);

export const API = {
  context: APIContext,
  methods,
};
