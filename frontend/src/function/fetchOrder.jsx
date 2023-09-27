import { toast } from "react-toastify";
import { config } from "../config/credentials";
import axiosInstance from "../config/interceptor";

export const fetchOrder = async () => {
  try {
    const response = await axiosInstance.get(
      `/order/admin/get/allorder`,
      config
    );
    return response.data;
  } catch (error) {
    toast.error(`${error}`);
  }
};

export const fetchOrderByID = async (user, id) => {
  try {
    const response = await axiosInstance.get(
      `/order/admin/get/allorder/${user}/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    toast.error(`${error}`);
  }
};
