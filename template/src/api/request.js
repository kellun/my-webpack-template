import axios from "axios";
const REQUEST_TIMEOUT = 6000;

// 创建axios实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASEURL,
  timeout: REQUEST_TIMEOUT // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  async config => {
    return config;
  },
  error => {
    // 处理请求错误
    console.error(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  res => {
    return res.data;
  },
  err => {
    console.error("response error:", err); // 处理请求错误
    return Promise.reject(err);
  }
);

export default service;
