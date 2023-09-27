import axios from "axios";
import { LogOutUser } from "../function/userHandle";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const status = error.response ? error.response.status : null;

    if (
      error.response.data.message === "jwt expired" ||
      (status === 401 && !originalRequest._retry)
    ) {
      originalRequest._retry = true;
      LogOutUser();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
