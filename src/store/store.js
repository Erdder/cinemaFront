/*
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex);

import getters from 'getter.js所在位置'

import user from 'user.js所在位置'

const stroe = new Vuex.Store({
  modules:{
    user
  },
  getters
})
export default store

getter.js文件 -->
const getters = {
  name: state => state.user.name,
}
export default getters

user.js文件 -->
const user = {
  state:{
    name: ""
  },
  mutations:{
    setName:(state, name) =>{
      state.name = name
    },
    actions:{
      commitName({commit}, name){
        commit("setName", name)
      }
    }
  }
  export default user



    <script>
  import store from 'store.js的路径'
  data(){
    return{
      name:store.getters.name;//引入getters中的对象
  }
  },
  methods:{
      useAction(){
        var item="张三";
        store.dispatch('setName',item);
      }
    }
    </script>
*/
