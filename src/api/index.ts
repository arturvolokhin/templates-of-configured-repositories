/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import { toast } from 'react-toastify';
import axios from 'axios';
import { deleteCookie, getCookie } from 'cookies-next';

import type { BaseRequestParams } from '@/types/common/BaseRequestParams';
import type { BaseRequestReturnType } from '@/types/common/BaseRequestReturnType';

import { AUTH_TOKEN, REQUEST_METHODS } from '../constants';

axios.defaults.validateStatus = status => status >= 200 && status <= 399;

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      const {
        status,
        data: { errors = null, message = null },
      } = error.response;
      if (typeof window !== 'undefined') {
        message && toast.error(message);
        status === 401 && deleteCookie(AUTH_TOKEN);
      }
      console.error('Axios response error', error.response);
      return Promise.reject({ status, errors, message });
    } else if (error.request) {
      console.error('Axios request error', error.request);
      const { status, statusText } = error.request;
      return Promise.reject({ status, message: statusText });
    } else {
      console.error('Axios undefined error', error.message);
      return Promise.reject({ message: error.message });
    }
  }
);

axios.interceptors.request.use(
  config => {
    config.headers.Accept = 'application/json';
    if (typeof window !== 'undefined') {
      config.headers.Authorization = `Bearer ${getCookie(AUTH_TOKEN)}`;
    }
    return config;
  },
  error => {
    console.error(error);
    return Promise.reject(error);
  }
);

const makeBaseRequest =
  (method: REQUEST_METHODS): BaseRequestReturnType =>
  async ({ url, data, headers, params }: BaseRequestParams) => {
    return axios({
      url,
      method,
      data,
      headers,
      params,
    });
  };

export const get = makeBaseRequest(REQUEST_METHODS.GET);
export const post = makeBaseRequest(REQUEST_METHODS.POST);
export const put = makeBaseRequest(REQUEST_METHODS.PUT);
export const patch = makeBaseRequest(REQUEST_METHODS.PATCH);
export const _delete = makeBaseRequest(REQUEST_METHODS.DELETE);
