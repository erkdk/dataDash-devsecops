import axios from "axios";

// Use relative URL - browser will use the same domain
const API = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "/api",
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
