/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
import { toast } from 'react-toastify';
import axios from 'axios';
import { getCookie } from 'cookies-next';

import type { BaseRequestParams } from '@/types/common/BaseRequestParams';
import type { BaseRequestReturnType } from '@/types/common/BaseRequestReturnType';
import { deleteEmptyKeys } from '@/utils/deleteEmptyKeys';

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
        toast.error(message);
      }
      return Promise.reject({ status, errors, message });
    } else if (error.request) {
      console.log('request', error.request);
      const { status, statusText } = error.request;
      return Promise.reject({ status, message: statusText });
    } else {
      console.error('else', error.message);
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
  async ({ url, body, headers, params }: BaseRequestParams) => {
    const requestBody = body instanceof FormData ? body : deleteEmptyKeys(body as Record<string, unknown>);
    const requestConfig = { headers: { ...headers }, ...(params ? params : {}) };

    switch (method) {
      case REQUEST_METHODS.GET:
        return axios.get(url, requestConfig);
      case REQUEST_METHODS.POST:
        return axios.post(url, requestBody, requestConfig);
      case REQUEST_METHODS.PUT:
        return axios.put(url, requestBody, requestConfig);
      case REQUEST_METHODS.PATCH:
        return axios.patch(url, requestBody, requestConfig);
      case REQUEST_METHODS.DELETE:
        return axios.delete(url, requestConfig);
      default:
        throw new Error(`Invalid request method ${method}.`);
    }
  };

export const get = makeBaseRequest(REQUEST_METHODS.GET);
export const post = makeBaseRequest(REQUEST_METHODS.POST);
export const put = makeBaseRequest(REQUEST_METHODS.PUT);
export const patch = makeBaseRequest(REQUEST_METHODS.PATCH);
export const _delete = makeBaseRequest(REQUEST_METHODS.DELETE);
