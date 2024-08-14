"use client";
import axios from "axios";

const baseURL =
  "https://kcb-boma-yangu-backend-kcb-boma-yangu.apps.dev.aro.kcbgroup.com/api/users";

let instance = axios.create({
  baseURL,
});

instance.interceptors.request.use(
  (config) => {
    const username = "BomaPortalClient";
    const password = "cbfbd0ab-2876-442b-a3c8-8aed9632ba83";

    config.auth = {
      username: username,
      password: password,
    };

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
export const URL = baseURL;
