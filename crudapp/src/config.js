import axios from "axios";

export const axiosInstance = axios.create({
	// baseURL: "http://localhost:8080/",
	baseURL: "http://192.168.64.3:4000/"
});