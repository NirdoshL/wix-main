//to store values in local storage
export const Store = (name, data) => {
  localStorage.removeItem(`${name}`);
  localStorage.setItem(`${name}`, JSON.stringify(data));
};
//to get values from local storage
export const GetStore = (name) => {
  return localStorage.getItem(`${name}`)
    ? JSON.parse(localStorage.getItem(`${name}`))
    : null;
};
