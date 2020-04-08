import axios from 'axios';
import qs from 'qs';
import { Notification } from 'element-ui';

const BASE_URL = process.env.VUE_APP_BASE_API;
const REQUEST_TIMEOUT = 10 * 6000;

// 创建axios实例
const service = axios.create({
  baseURL: BASE_URL,
  timeout: REQUEST_TIMEOUT // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    // 以表单形式提交数据则对数据进行格式化操作
    if (config.headers['Content-Type'] == 'application/x-www-form-urlencoded') {
      config.data = qs.stringify(config.data);
    }
    return config
  },
  error => {
    // 处理请求错误
    console.error(error) // for debug
    Promise.reject(error)
  }
);


// respone拦截器
service.interceptors.response.use(
  res => {
    return res.data
  },
  err => {
    console.error('response error:', err) // 处理请求错误
    if(err.response&&err.response){
      Notification({
        title:'提示',
        type:'error',
        message:err.response.data.message
      });
    }else{
      alert(err.toString());
    }
    if (err.response.status == 401) {
      alert('请登录');
      window.location.href = './index.html';
    }
    return Promise.reject(err)
  }
);

export default service;