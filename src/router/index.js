import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Register from '@/components/Register'
import adminMovieSchedule from '@/components/adminMovieSchedule'
import adminMovieManage from '@/components/adminMovieManage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/Register',
      name: 'Register',
      component: Register
    },
    {
      path: '/adminMovieManage',
      name: 'adminMovieManage',
      component: adminMovieManage
    },
{
  path: '/adminMovieSchedule',
    name: 'adminMovieSchedule',
  component: adminMovieSchedule
}
  ],
})
