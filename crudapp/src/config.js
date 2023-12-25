import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://ocs-team-crud-app-backend.onrender.com"
});
