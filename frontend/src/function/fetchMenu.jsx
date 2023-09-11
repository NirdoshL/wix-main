import axios from "axios";
import { toast } from "react-toastify";
import { config } from "../config/credentials";
// import { Store } from "../config/store";

//Super Admin To toggle restaurnat visibility
export const toggleVisibility = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/menu/menus/restaurant/toggle/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    toast(`${error}`);
  }
};

//will fetch the all menu from backend
export const fetchData = async () => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/menu/menus`,
      config
    );
    return response.data;
  } catch (error) {
    toast(`${error}`);
  }
};

// will fetch sections and menu

export const fetchSectionAndMenu = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/menu/menus/section/data/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    toast(`${error}`);
  }
};

//will fetch Individual menu on the basis of id as params

export const fetchDataItem = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/v1/menu/menus/${id}`,
      config
    );
    return response.data;
  } catch (error) {
    toast(`${error}`);
  }
};

///!!!!!!!!!!!!!!!! Only if you are using storage to store this values !!!!!!!!!!///

// export const FetchMenuData = async () => {
//   try {
//     await axios
//       .get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/menu/menus`, config)
//       .then((response) => {
//         if (response && response.data) {
//           const data = response.data;
//           return data;
//         }
//       })
//       .catch((error) => {
//         toast(`${error.response.data.message}`);
//         Store("menus", error.response.data);
//       });
//   } catch (error) {
//     toast(`${error.response.data.message}`);
//     Store("menus", error.response.data);
//   }
// };
//http://localhost:5000/api/v1/menu/menus/6814412901050500
// export const FetchMenuItem = async (id) => {
//   try {
//     await axios
//       .get(`${process.env.REACT_APP_BACKEND_URL}/v1/menu/menus/${id}`, config)
//       .then((response) => {
//         if (response && response.data) {
//           const data = response.data;
//           return Store("menuItems", data);
//         }
//       })
//       .catch((error) => {
//         toast(`${error.response.data.message}`);
//       });
//   } catch (error) {
//     toast(`${error.response.data.message}`);
//   }
// };
