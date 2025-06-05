const base_url = "http://localhost:8001/";

export const endpoints = {
  register: "api/user/register",
  eventManagerRegister: "api/eventManager/createEventManager",
  login: "api/user/login",
  profile: "api/user/profile-details",
  categories: "api/category/getAllCategories",
};
export default base_url;