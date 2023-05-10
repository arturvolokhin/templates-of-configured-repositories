import type { AxiosHeaders, AxiosRequestConfig } from 'axios';

export type BaseRequestParams = {
  url: string;
  data?: Record<string, unknown> | FormData;
  headers?: AxiosHeaders;
  params?: AxiosRequestConfig<Record<string, unknown> | FormData>['params'];
};
