import type { RequestHeaders } from '../RequestHeaders';

export interface BaseRequestParams {
  url: string;
  body?: Record<string, unknown> | FormData;
  params?: Record<string, unknown>;
  headers?: RequestHeaders;
  isFormData?: boolean;
}
