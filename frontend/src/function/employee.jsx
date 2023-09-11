import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../config/credentials";

//fetches all users includeing admin,user,superadmin
export const employeeData = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/users/admin/getusers`,
      config
    );
    return response.data;
  } catch (error) {
    toast(`${error}`);
  }
};
//toggles user to admin and vice versa by superadmin
export const toggleAccess = async (data) => {
  try {
    const response = await axios.patch(
      `${process.env.REACT_APP_BACKEND_URL}/users/superadmin/changerole`,
      data,
      config
    );
    if (response && response.data) {
      toast(`${response.data.message}`);
      return;
    }
  } catch (error) {
    toast(`${error}`);
  }
};
