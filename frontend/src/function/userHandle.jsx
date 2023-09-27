import axios from "axios";
import { toast } from "react-toastify";
import { Store } from "../config/store";
import { config } from "../config/credentials";
import axiosInstance from "../config/interceptor";

export const RegisterUser = async (data) => {
  try {
    await axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/users/register`, data)
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
        toast.error(`${error.response.data.message}`);
      });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
  }
};

export const LoginWixUser = async (data) => {
  try {
    await axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/users/login/wix/memberonly`,
        data,
        config
      )
      .then((response) => {
        if (response && response.data) {
          const data = response.data;
          Store("user", data);
          return;
        } else {
          window.location.replace("/");
        }
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
        window.location.replace("/");
      });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
  }
};

export const LogOutUser = async () => {
  try {
    await axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/users/logout`, config)
      .then((response) => {
        if (response && response.data) {
          localStorage.clear();
          toast.success(`${response.data.message}`);
          window.location.replace("/register");
        }
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
      });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
  }
};

export const getAllUser = async () => {
  try {
    await axiosInstance
      .get("/users/admin/getusers", config)
      .then((response) => {
        if (response && response.data) {
          console.log(response.data);
          return response.data;
        }
      })
      .catch((error) => {
        toast.error(`${error.response.data.message}`);
      });
  } catch (error) {
    toast.error(`${error.response.data.message}`);
  }
};
