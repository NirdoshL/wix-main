import axios from "axios";

export const Store = (name, data) => {
  localStorage.removeItem(`${name}`);
  localStorage.setItem(`${name}`, JSON.stringify(data));
};

export const FetchMenuData = async () => {
  try {
    await axios
      .get("http://localhost:5000/api/v1/menu/menus")
      .then((response) => {
        if (response && response.data) {
          const data = response.data;
          return Store("menus", data);
        }
      })
      .catch((error) => {
        Store("menus", error.response.data);
      });
  } catch (error) {
    Store("menus", error.response.data);
  }
};
//http://localhost:5000/api/v1/menu/menus/6814412901050500
export const FetchMenuItem = async (id) => {
  try {
    await axios
      .get(`http://localhost:5000/api/v1/menu/menus/${id}`)
      .then((response) => {
        if (response && response.data) {
          const data = response.data;
          return Store("menuItems", data);
        }
      })
      .catch((error) => {
        Store("menuItems", error.response.data);
      });
  } catch (error) {
    Store("menuItems", error.response.data);
  }
};
