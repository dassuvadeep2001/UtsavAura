const base_url = "http://localhost:8001/";
export const imageBaseUrl = `${base_url}uploads/`;
export const endpoints = {
  register: "api/user/register",
  eventManagerRegister: "api/eventManager/createEventManager",
  login: "api/user/login",
  profile: "api/user/profile",
  categories: "api/category/getAllCategories",
  createCategory: "api/category/createCategory",
  updateCategory: "api/category/updateCategory",
  deleteCategory: "api/category/deleteCategory",
  allUser: "api/user/getAllUsers",
  emailCheck: "api/user/emailCheck",
  query: "api/query/getQueries",
  verifyEmail: "api/user/verify-email",
  forgetPassword: "api/user/forget-password",
  resetPassword: "api/user/reset-password",
  createQuery: "api/query/createQuery",
  deleteProfile: "api/user/delete-profile",
  deleteUser: "api/user/delete-user",
  userUpdateProfile: "api/user/update-profile",
  managerUpdateProfile: "api/eventManager/updateEventManager",
};
export default base_url;
