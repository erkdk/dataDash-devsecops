import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "http://192.168.56.11:5000/api",
});

// Items CRUD
export const getItems = () => API.get("/items");
export const createItem = (item) => API.post("/items", item);
export const updateItem = (id, item) => API.put(`/items/${id}`, item);
export const deleteItem = (id) => API.delete(`/items/${id}`);

// Add interceptors if needed for error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response);
    return Promise.reject(error);
  }
);
