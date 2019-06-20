import axios from 'axios';
import qs from 'qs';

axios.defaults.baseURL = "http://localhost:8080";
// axios.defaults.baseURL = "http://192.168.2.130:8080";

const admin = {

  //管理员登录tested
  VerifyAdmin(params) {
    return axios.post('/VerifyAdmin', params);
  },

  //影院员工注册时获取工号tested
  CheckJobNumber(jobNumber) {
    return axios.get('/CheckJobNumber?&jobNumber=' + jobNumber);
  },

  //新增员工tested
  InsertEmployee(params) {
    return axios.post('/InsertEmployee', params);
  },
  //注册员工tested
  RegisterEmployee(params) {
    return axios.post('/RegisterEmployee', params);
  },

  //获取会员卡列表
  GetAdminVipCard() {
    return axios.get('${base.sq}/GetAdminVipCard');
  },

  //更新会员卡
  UpdateAdminVipCard() {
    return axios.post('${base.sq}/UpdateAdminVipCard', qs.stringify(params));
  },

  //删除会员卡
  DeleteAdminVipCard(params) {
    return axios.get('${base.sq}/GetAdminVipCard', params);
  },

  //新增会员卡
  InsertAdminVipCard(params) {
    return axios.post('${base.sq}/InsertAdminVipCard', qs.stringify(params));
  },


  //更新退票策略
  UpdateRefund() {
    return axios.post('${base.sq}/UpdateRefund', qs.stringify(params));
  },
  //获取退票策略列表
  GetRefund() {
    return axios.get('${base.sq}/GetRefund');
  },

  //获取所有优惠券
  GetCoupon() {
    return axios.post('${base.sq}/GetCoupon')
  },
  //新增优惠策略
  InsertCoupon(params) {
    return axios.post('${base.sq}/InsertCoupon', qs.stringify(params));
  },
  //新增影厅tested
  InsertHall(params) {
    return axios.post("/InsertHall", params)
  },
  UpdateHall(data, success) {
    request({
      url: '/AdminHallAdd',
      method: 'post',
      data: data
    }.then(success))
  },
  DeleteHall(data, success) {
    request({
      url: '/AdminHallAdd',
      method: 'post',
      data: data
    }.then(success))
  },
  InsertTicket(data, success) {
    request({
      url: '/AdminHallAdd',
      method: 'post',
      data: data
    }.then(success))
  },
  GetTicket(data, success) {
    request({
      url: '/AdminHallAdd',
      method: 'get',
      data: data
    }.then(success))
  },
  UpdateTicket(data, success) {
    request({
      url: '/AdminHallAdd',
      method: 'post',
      data: data
    }.then(success))
  },
  DeletTicket(data, success) {
    request({
      url: '/AdminHallAdd',
      method: 'post',
      data: data
    }.then(success))
  },
  InsertMovie(params) {
    return axios.post("/InsertMovie", params);
  },
  UpdateMovie(data, success) {
    request({
      url: '/AdminMovieManage',
      method: 'post',
      data: data
    }.then(success))
  },
  DeleteMovie(params) {
    request({
      url: '/DeleteMovie',
      method: 'Get',
      params: params
    }.then(success))
  },

  GetMovieList(params) {
    return axios.get("/GetMovieList", params)
  },

  GetScheduleList(success) {
    request({
      url: '/AdminMovieList',
      method: 'get',
    }.then(success))
  },
  InsertSchedule(data, success) {
    request({
      url: '/AdminMovieSchedule',
      method: 'post',
      data: data
    }.then(success))
  },
  UpdateSchedule(data, success) {
    request({
      url: '/AdminMovieSchedule',
      method: 'post',
      data: data
    }.then(success))
  },
  DeleteSchedule(data, success) {
    request({
      url: '/DeleteMovie',
      method: 'post',
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
      params: params,
    })
  },
};

export default admin;
