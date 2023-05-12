import type { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';

type AxiosDataType = Record<string, unknown> | FormData;

export type BaseRequestParams = {
  url: string;
  data?: AxiosDataType;
  headers?: RawAxiosRequestHeaders;
  params?: AxiosRequestConfig<AxiosDataType>['params'];
};


