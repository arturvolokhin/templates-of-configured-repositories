import { get } from '@/api';
import { TODOS_ENDPOINT } from '@/api/endpoints/server';
import type { DataResponse } from '@/types/common';
import type { CustomError } from '@/types/common';
import { mapJsonToTodoType } from '@/types/data/mapJsonToTodoType';
import type { TodoJson } from '@/types/data/TodoJson';
import type { TodoType } from '@/types/domain/TodoType';

const getTodosData = async (): Promise<DataResponse<TodoType | CustomError>> => {
  try {

    const { data: json } = await get<TodoJson>({ url: TODOS_ENDPOINT });

    
    const data = mapJsonToTodoType(json);

    return { ok: true, data };
  } catch (error) {
    return Promise.reject(error);
  }
};

export default getTodosData;
