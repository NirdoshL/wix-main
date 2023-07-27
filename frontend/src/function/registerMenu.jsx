import axios from "axios";
import { toast } from "react-toastify";

export const RegisterMenuData = async (data) => {
  try {
    await axios
      .post("http://localhost:5000/api/v1/menu/register", data)
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
