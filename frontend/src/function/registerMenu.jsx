import { toast } from "react-toastify";
import { config } from "../config/credentials";
import axiosInstance from "../config/interceptor";

export const RegisterMenuData = async (data) => {
  try {
    await axiosInstance
      .post(`/api/v1/menu/register`, data, config)
      .then((response) => {
        if (response) {
          toast.success(`${response.data.message}`);
          return;
        }
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
        return;
      });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
    return;
  }
};
