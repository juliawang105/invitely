import axios from "axios";

export const fetchEventPosts = (eventId) => {
  return axios.get(`/api/posts/event/${eventId}`);
};

export const createPost = data => {
  return axios.post(`/api/posts/event/${data.event.id}`, data);
};

export const updatePost = data => {
  return axios.patch(`/api/posts/${data.id}`);
};

export const getPost = id => {
  return axios.get(`/api/posts/${id}`)
};

