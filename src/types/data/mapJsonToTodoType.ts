import type { TodoType } from '../domain/TodoType';

import type { TodoJson } from './TodoJson';

export const mapJsonToTodoType = (json: TodoJson): TodoType => {
  return {
    id: json.id,
    title: json.title,
    completed: json.completed,
  };
};
