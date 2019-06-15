import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = "http://172.25.184.69:8080";

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

  //管理员登录tested
  VerifyAdmin(params){
    return axios.post('/VerifyAdmin',params);
  },

  //影院员工注册时获取工号
  checkJobNumber(params){
    return axios.post('/checkJobNumber',params);
  },

  //影院员工注册
  AdminRegister(params){
    return axios.post('/InsertEmployee',params);
  },

  //获取会员卡列表
  GetAdminVipCard(){
    return axios.get('${base.sq}/GetAdminVipCard');
  },

  //更新会员卡
  UpdateAdminVipCard(){
    return axios.post('${base.sq}/UpdateAdminVipCard',qs.stringify(params));
  },

  //删除会员卡
  DeleteAdminVipCard(params){
    return axios.get('${base.sq}/GetAdminVipCard',params);
  },

  //新增会员卡
  InsertAdminVipCard(params){
    return axios.post('${base.sq}/InsertAdminVipCard',qs.stringify(params));
  },

//获取排片列表
  GetScheduleList(params) {
    return axios.get('/GetAdminVipCard',params);
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

  //更新退票策略
  UpdateRefund(){
    return axios.post('${base.sq}/UpdateRefund',qs.stringify(params));
  },
  //获取退票策略列表
  GetRefund(){
    return axios.get('${base.sq}/GetRefund');
  },

  //获取所有优惠券
  GetCoupon(){
    return axios.post('${base.sq}/GetCoupon')
  },
  //新增优惠策略
  InsertCoupon(params){
    return axios.post('${base.sq}/InsertCoupon',qs.stringify(params));
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

export default admin;
