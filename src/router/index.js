import Vue from 'vue'
import Router from 'vue-router'
import AdminLogin from '../views/AdminLogin.vue'
import AdminMain from '../views/AdminMain'
import AdminRegister from '../views/AdminRegister.vue'


Vue.use(Router)

export default new Router({
  routes: [
     {
      path: '/',
      name: 'AdminLogin',
      component: AdminLogin,
    },
    {
      path: '/AdminRegister',
      name: 'AdminRegister',
      component: AdminRegister,
    },
    {
      path:'/AdminMain',
      name:'/AdminMain',
      component: AdminMain,
      children: [
         {
          path: '/AdminMovieManage',
          name: 'AdminMovieManage',
          component: () => import('../views/AdminMovieManage.vue')
        },
         {
          path: '/AdminMovieSchedule',
          name: 'AdminMovieSchedule',
          component: () => import('../views/AdminMovieSchedule.vue')
        },
        {
          path: '/AdminHallAdd',
          name: 'AdminHallAdd',
          component: () => import('../views/AdminHallAdd.vue')
        },
        {
          path: '/AdminHallCheck',
          name: 'AdminHallCheck',
          component: () => import('../views/AdminHallCheck.vue')
        },
        {
          path: '/AdminMovieList',
          name: 'AdminMovieList',
          component: () => import('../views/AdminMovieList.vue')
        },
        {
          path: '/AdminMovieDetail',
          name: 'AdminMovieDetail',
          component: () => import('../views/AdminMovieDetail.vue')
        },
        {
          path: '/AdminScheduleList',
          name: 'AdminScheduleList',
          component: () => import('../views/AdminScheduleList.vue')
        },
        {
          path: '/AdminVipCard',
          name: 'AdminVipCard',
          component: () => import('../views/AdminVipCard.vue')
        },
      ]
    },
  ],
})
