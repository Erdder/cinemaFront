import Vue from 'vue'
import Router from 'vue-router'
import AdminLogin from '../views/AdminLogin.vue'
import Register from '../views/Register'
import AdminMain from '../views/AdminMain'


Vue.use(Router)

export default new Router({
  routes: [
     {
      path: '/',
      name: 'AdminLogin',
      component: AdminLogin,
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
      ]
    },
  ],
})
