import axios from "axios";

export const fetchEventTodos = (eventId) => {
  return axios.get(`/api/todos/event/${eventId}`)
};

export const createTodo = data => {
  return axios.post(`api/todos/`, data);
};

export const updateTodo = data => {
  return axios.patch(`/api/todos/${data._id}`, data);
};

export const getTodo = id => {
  return axios.get(`api/todos/${id}`);
};

export const deleteTodo = id => {
  return axios.delete(`/api/todos/${id}`);
};

