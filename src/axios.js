import axios from "axios";
import store from "./store/modules/login-page/login";
const baseURL = process.env.VUE_APP_BASE_URL;
const api = axios.create({
  baseURL,
  headers: {
    Accept: "application/json",
  },
});

api.interceptors.request.use((request) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    request.headers.common["Authorization"] = `Bearer ${access_token}`;
  }
  return request;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response.status === 401) {
      const refresh_token = localStorage.getItem("refresh_token");
      api.use.interceptors.request.use((request) => {
        if (refresh_token) {
          request.headers.common["Authorization"] = `Bearer ${refresh_token}`;
        }
      });
      store.dispatch("login/sendForm", {
        client_id: process.env.VUE_APP_CLIENT_ID,
        client_secret: process.env.VUE_APP_CLIENT_SECRET_KEY,
        grant_type: process.env.VUE_APP_REFRESH_TOKEN,
        refresh_token: refresh_token,
      });
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;
