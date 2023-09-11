import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../config/credentials";

export const fetchOrder = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/order/admin/get/allorder`,
      config
    );
    return response.data;
  } catch (error) {
    toast(`${error}`);
  }
};

export const fetchOrderByID = async (user, id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/order/admin/get/allorder/${user}/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    toast(`${error}`);
  }
};
