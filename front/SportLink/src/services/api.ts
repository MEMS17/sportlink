import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3000", // ton backend NestJS
});

// Intercepteur pour ajouter le token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const login = (email: string, password: string) => api.post('/auth/login', { email, password });
export const register = (name: string, email: string, password: string) => api.post('/auth/register', { name, email, password });

// Equipment
export const getEquipment = (filters?: any) => api.get('/equipment', { params: filters });
export const createEquipment = (data: any) => api.post('/equipment', data);
export const updateEquipment = (id: string, data: any) => api.patch(`/equipment/${id}`, data);
export const deleteEquipment = (id: string) => api.delete(`/equipment/${id}`);

// Reservations
export const getReservations = () => api.get('/reservations');
export const getMyReservations = () => api.get('/reservations/me');
export const createReservation = (equipmentId: string, startDate: string, endDate: string) => api.post('/reservations', { equipmentId, startDate, endDate });
export const returnReservation = (id: string) => api.patch(`/reservations/${id}/return`);

// Users (admin)
export const getUsers = () => api.get('/users');

// AI
export const getRecommendations = (description: string) => api.post('/recommendations', { description });

// export const users = [
//   { id: 1, name: "Redouane" },
//   { id: 2, name: "Mehdi" },
// ];

// export const events = [
//   { id: 1, title: "Natation", date: "2026-03-30" },
//   { id: 2, title: "Musculation", date: "2026-03-31" },
// ];