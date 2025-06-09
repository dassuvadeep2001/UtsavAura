const base_url = "http://localhost:8001/";
export const imageBaseUrl = `${base_url}uploads/`;
export const endpoints = {
  register: "api/user/register",
  eventManagerRegister: "api/eventManager/createEventManager",
  login: "api/user/login",
  profile: "api/user/profile",
  categories: "api/category/getAllCategories",
  createCategory: "api/category/createCategory",
  allUser: "api/user/getAllUsers",
  query: "api/query/getQueries",
  verifyEmail: "api/user/verify-email",
  forgetPassword: "api/user/forget-password",
  resetPassword: "api/user/reset-password",
  createQuery: "api/query/createQuery",
};
export default base_url;