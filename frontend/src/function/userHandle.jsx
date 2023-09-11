import axios from "axios";
import { toast } from "react-toastify";
import { Store } from "../config/store";
import { config } from "../config/credentials";

export const RegisterUser = async (data) => {
  try {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/register`, data)
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

export const LoginUser = async (data) => {
  try {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/login`, data, config)
      .then((response) => {
        if (response && response.data) {
          const data = response.data;
          Store("user", data);
          window.location.reload();
          return;
        }
      })
      .catch((error) => {
        toast(`${error.response.data.message}`);
      });
  } catch (error) {
    toast(`${error.response.data.message}`);
  }
};

export const LogOutUser = async () => {
  try {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/logout`, config)
      .then((response) => {
        if (response && response.data) {
          localStorage.clear();
          window.location.replace("/register");
          toast(`${response.data.message}`);
        }
      })
      .catch((error) => {
        toast(`${error.response.data.message}`);
      });
  } catch (error) {
    toast(`${error.response.data.message}`);
  }
};

export const getAllUser = async () => {
  try {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/admin/getusers`, config)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data);
          return response.data;
        }
      })
      .catch((error) => {
        toast(`${error.response.data.message}`);
      });
  } catch (error) {
    toast(`${error.response.data.message}`);
  }
};
