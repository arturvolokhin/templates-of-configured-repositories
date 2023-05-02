import type { PaginationLinks } from '../PaginationLinks';
import type { PaginationMeta } from '../PaginationMeta';

export interface JsonResponse<T> {
  data: T;
  links?: PaginationLinks;
  meta?: PaginationMeta;
}
