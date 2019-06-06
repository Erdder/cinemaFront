import axios from 'axios';
import QS from 'qs';
import {Toast} from 'vant';

//设置baseUrl（默认环境不变）
axios.defaults.baseURL = '';
//设置超时时间
axios.defaults.timeout = 10000;
//设置post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

//请求拦截 涉及到token
axios.interceptors.request.use(
  config => {
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  error => {
    return Promise.error(error);
  });

//响应拦截器
axios.interceptors.response.use(
  response =>{
    if (response.status === 200){
      return Promise.resolve(response);
    }else{
      return Promise.reject(response);
    }
  },
  error => {
    if (error.response.status){
      switch (error.response.status) {
        case 404:
          Toast({
            message: '网络请求不存在',
            duration: 1500,
            forbidClick: true
          });
          break;
      }
      return Promise.reject(error.response);
    }
  }
  );

//对外接口
export function  request({method, url, params}){
  if(method === 'Get'){
    return get(url,params);
  }else if(method === 'Post'){
    return post(url,params);
  }
}

//封装get方法
function get(url,params) {
  return new Promise((resolve, reject) => {
    axios.get(url, params)
      .then(res => {
        resolve(res.data);
      }).catch(err => {
      reject(err.data);
    })
  });
}

//封装post方法
export function post(url, params){
  return new Promise((resolve,reject) =>{
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        reject(err.data)
      })
  });
}

export default service
