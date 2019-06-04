import request from "../utils/request"

export default {
  VerifyAdmin(data, success) {
    request({
      url: '/VerifyAdmin',
      method: 'post',
      data: data
    }.then(success))
  },
  GetHall(success) {
    request({
      url:'/AdminHallCheck',
      method:'get',
    }.then(success))
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
  DeleteMovie(data,success) {
    request({
      url:'/AdminMovieManage',
      method:'post',
      data: data
    }.then(success))
  },
  GetMovieList(success) {
    request({
      url:'/AdminMovieList',
      method:'get',
    }.then(success))
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
      url:'/AdminMovieSchedule',
      method:'post',
      data: data
    }.then(success))
  },


}
