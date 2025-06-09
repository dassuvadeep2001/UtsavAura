import axios from "axios";
import base_url from "./api_url";


let axiosInstance = axios.create({
  baseURL: base_url,
});

axiosInstance.interceptors.request.use(
  async function (config) {
    const token = localStorage.getItem("token");
    console.log("token", token);
    
    if (token) {
      config.headers["x-access-token"] = token;
      config.headers.Authorization=token
      //config.headers.Authorization=`Bearer$(token)`
    }
    return config;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export default axiosInstance;



