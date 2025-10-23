import axios from 'axios';

const API_URL = 'http://localhost:5000/api/todos';

export const getAllTodos = () => axios.get(`${API_URL}`);

export const createTodo = (data) => axios.post(`${API_URL}`, data);

export const updateTodo = (data) => axios.put(`${API_URL}/${data._id}`, data);

export const deleteTodo = (id) => axios.delete(`${API_URL}/${id}`);