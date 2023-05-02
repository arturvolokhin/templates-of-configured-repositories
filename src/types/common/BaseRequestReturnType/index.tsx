import type { AxiosResponse } from 'axios';

import type { BaseRequestParams } from '../BaseRequestParams';

export type BaseRequestReturnType = <T>(params: BaseRequestParams) => Promise<AxiosResponse<T>>;
