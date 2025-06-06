const base_url = "http://localhost:8001/";
export const imageBaseUrl = `${base_url}uploads/`;
export const endpoints = {
  register: "api/user/register",
  eventManagerRegister: "api/eventManager/createEventManager",
  login: "api/user/login",
  profile: "api/user/profile",
  categories: "api/category/getAllCategories",
};
export default base_url;