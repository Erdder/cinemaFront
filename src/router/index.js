import Vue from 'vue'
import Router from 'vue-router'
import AdminLogin from '../views/AdminLogin.vue'
import Register from '../views/Register'
import AdminMain from '../views/AdminMain'
import AdminMovieSchedule from '../views/AdminMovieSchedule'
import AdminMovieManage from '../views/AdminMovieManage'

Vue.use(Router)

export default new Router({
  routes: [
     {
      path: '/AdminLogin',
      name: 'AdminLogin',
      component: AdminLogin,
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
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
        }
      ]
    },
  ],
})
