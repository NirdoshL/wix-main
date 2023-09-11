import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../config/credentials";

export const RegisterMenuData = async (data) => {
  try {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/api/v1/menu/register`,
        data,
        config
      )
      .then((response) => {
        if (response) {
          toast(`${response.data.message}`);
          return;
        }
      })
      .catch((error) => {
        toast(`${error.response.data.message}`);
        return;
      });
  } catch (error) {
    toast(`${error.response.data.message}`);
    return;
  }
};
