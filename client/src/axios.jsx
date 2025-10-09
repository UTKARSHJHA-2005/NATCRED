import axios from "axios";// Axios
// BaseURL fro axios
const api = axios.create({
  baseURL: "jha.utkarsh2005@gmail.com/api",
});
// Token Work
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
