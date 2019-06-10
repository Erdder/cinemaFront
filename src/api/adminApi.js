import request from "../utils/request"
import { get,post } from '../utils/request'

export default {
  VerifyAdmin(params) {
    return request({
      url: '/VerifyAdmin',
      methods: 'Get',
      params:params
    })
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
  DeleteMovie(params) {
    request({
      url:'/AdminMovieManage',
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
      url:'/AdminMovieSchedule',
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


}

