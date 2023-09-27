import { toast } from "react-toastify";
import { config } from "../config/credentials";
import axiosInstance from "../config/interceptor";

//fetches all users includeing admin,user,superadmin
export const employeeData = async () => {
  try {
    const response = await axiosInstance.get(`/users/admin/getusers`, config);
    return response.data;
  } catch (error) {
    toast.error(`${error}`);
  }
};
//toggles user to admin and vice versa by superadmin
export const toggleAccess = async (data) => {
  try {
    const response = await axiosInstance.patch(
      `/users/superadmin/changerole`,
      data,
      config
    );
    if (response && response.data) {
      toast.success(`${response.data.message}`);
      return;
    }
  } catch (error) {
    toast.error(`${error}`);
  }
};
