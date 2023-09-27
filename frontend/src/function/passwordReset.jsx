import { toast } from "react-toastify";
import { config } from "../config/credentials";
import axiosInstance from "../config/interceptor";

export const resetPasswordToken = async () => {
  try {
    const response = await axiosInstance.get(
      `/users/verification/token`,
      config
    );
    if (response && response.data) {
      toast.success(`${response.data.message}`);
      return response.data.success;
    }
  } catch (error) {
    toast.error(`${error}`);
  }
};

export const resetPassword = async (data) => {
  try {
    const response = await axiosInstance.patch(`/users/update`, data, config);
    if (response && response.data) {
      toast.success(`${response.data.message}`);
      return;
    }
  } catch (error) {
    toast.error(`${error}`);
  }
};
