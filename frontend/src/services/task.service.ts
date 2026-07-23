import api from "./api";


export const getDashboardStats = async () => {
  const response = await api.get("/tasks/stats");

  return response.data;
};


export const getTasks = async (
  search?: string,
  status?: string,
  priority?: string,
  sort?: string,
) => {
  const response = await api.get("/tasks", {
    params: {
      search,
      status,
      priority,
      sort,
    },
  });

  return response.data;
};


export const getTaskById = async (id: number) => {
  const response = await api.get(`/tasks/${id}`);

  return response.data;
};

export interface TaskPayload {
  title: string;
  description?: string;
  priority?: string;
  status?: string;
  dueDate: string;
}

export const createTask = async (data: TaskPayload) => {
  const response = await api.post("/tasks", data);
  return response.data;
};

export const updateTask = async (id: number, data: Partial<TaskPayload>) => {
  const response = await api.put(`/tasks/${id}`, data);
  return response.data;
};

export const deleteTask = async (id: number) => {
  const response = await api.delete(`/tasks/${id}`);

  return response.data;
};
