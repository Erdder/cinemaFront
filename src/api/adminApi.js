import axios from '../request/http';
import qs from 'qs';

const admin = {

  /*
   // 新闻列表
    articleList () {
        return axios.get(`${base.sq}/topics`);
    },
    // 新闻详情,演示
    articleDetail (id, params) {
        return axios.get(`${base.sq}/topic/${id}`, {
            params: params
        });
    },
    // post提交
    login (params) {
        return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
    }
    // 其他接口…………
   */

  //管理员登录
  VerifyAdmin(params){
    return axios.post('${base.sq}/VerifyAdmin',qs.stringify(params));
  },

  AdminRegister(params){
    return axios.post('${base.sq}/adminRegister',qs.stringify(params));
  },

  InsetHall(data,success) {
    request({
      url:'/AdminHallAdd',
      method:'post',
      data: data
    }.then(success))
  },
  UpdateHall(data,success) {
    request({
      url:'/AdminHallAdd',
      method:'post',
      data: data
    }.then(success))
  },
  DeleteHall(data,success) {
    request({
      url:'/AdminHallAdd',
      method:'post',
      data: data
    }.then(success))
  },
  InsertTicket(data,success) {
    request({
      url:'/AdminHallAdd',
      method:'post',
      data: data
    }.then(success))
  },
  GetTicket(data,success) {
    request({
      url:'/AdminHallAdd',
      method:'get',
      data: data
    }.then(success))
  },
  UpdateTicket(data,success) {
    request({
      url:'/AdminHallAdd',
      method:'post',
      data: data
    }.then(success))
  },
  DeletTicket(data,success) {
    request({
      url:'/AdminHallAdd',
      method:'post',
      data: data
    }.then(success))
  },
  InsertMovie(data,success) {
    request({
      url:'/AdminMovieManage',
      method:'post',
      data: data
    }.then(success))
  },
  UpdateMovie(data,success) {
    request({
      url:'/AdminMovieManage',
      method:'post',
      data: data
    }.then(success))
  },
  DeleteMovie(params) {
    request({
      url:'/DeleteMovie',
      method:'Get',
      params: params
    }.then(success))
  },

  GetMovieList() {
    return request({
      url: '/AdminMovieList',
      method: 'Get',
    })
  },

  GetScheduleList(success) {
    request({
      url:'/AdminMovieList',
      method:'get',
    }.then(success))
  },
  InsertSchedule(data,success) {
    request({
      url:'/AdminMovieSchedule',
      method:'post',
      data: data
    }.then(success))
  },
  UpdateSchedule(data,success) {
    request({
      url:'/AdminMovieSchedule',
      method:'post',
      data: data
    }.then(success))
  },
  DeleteSchedule(data,success) {
    request({
      url:'/DeleteMovie',
      method:'post',
      data: data
    }.then(success))
  },
  //所有电影
  GetLikeMarkList(params) {
    return request({
      url: '/AdminDataList',
      method: 'Get',
      params: params,
    })
  },
      //单部电影
      GetLikeMarkDetail(params) {
      return request({
        url: '/AdminDataList',
        method: 'Get',
        params:params,
      })
  },
};
