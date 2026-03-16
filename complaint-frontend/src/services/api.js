import axios from "axios";

const API = axios.create({
  baseURL: "https://ttdeployment-ddu1.onrender.com",
});

API.interceptors.request.use((config) => {

  const token = localStorage.getItem("token");

  // ⭐ ADDED: Debug log
  console.log("JWT Token:", token);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;

});

/* ⭐ ADDED: Handle expired token */

API.interceptors.response.use(

  (response) => response,

  (error) => {

    if (error.response && error.response.status === 401) {

      console.error("Unauthorized - Token may be expired");

      localStorage.removeItem("token");

      window.location.href = "/";

    }

    return Promise.reject(error);

  }

);

export default API;