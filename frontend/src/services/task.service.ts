import api from "./api";

export const getDashboardStats = async () => {
    const response = await api.get("/tasks/stats");
    return response.data;
};

export const getTasks = async () => {
    const response = await api.get("/tasks");
    return response.data;
};

export const createTask = async (data: any) => {
    const response = await api.post("/tasks", data);
    return response.data;
};

export const updateTask = async (id: number, data: any) => {
    const response = await api.put(`/tasks/${id}`, data);
    return response.data;
};

export const deleteTask = async (id: number) => {
    const response = await api.delete(`/tasks/${id}`);
    return response.data;
};