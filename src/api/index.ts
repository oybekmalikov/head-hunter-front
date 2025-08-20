import axios from "axios";
import { clearStorage, getItem } from "@/helpers/storage";

const axiosInstance = axios.create({
    baseURL: process.env.BASE_URL
});

axiosInstance.interceptors.request.use((config) => {
    const accessToken = getItem('accessToken');
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config;
});

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response && error.response.status === 401) {
            window.location.href = "/";
            clearStorage();
        }
        return Promise.reject(error);
    }
);

export default axiosInstance