import { toast } from "react-toastify";
import { config } from "../config/credentials";
import axiosInstance from "../config/interceptor";

export const sendEmail = async (data) => {
  try {
    await axiosInstance
      .post("/users/super/email", data, config)
      .then((response) => {
        if (response && response.data) {
          toast.success(`${response.data.message}`);
          return;
        }
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
      });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
  }
};
