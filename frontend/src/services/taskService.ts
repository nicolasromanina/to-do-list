import api from './api';

export interface Task {
  id?: string;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
}

export const getTasks = async () => {
  const response = await api.get<Task[]>('/tasks');
  return response.data;
};

export const createTask = async (task: Task) => {
  const response = await api.post<Task>('/tasks', task);
  return response.data;
};

export const updateTask = async (id: string, task: Task) => {
  const response = await api.put<Task>(`/tasks/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  await api.delete(`/tasks/${id}`);
};