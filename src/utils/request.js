import axios from 'axios'

const service = axios.create({
  baseURL: "http://172.28.202.212:8080",
  timeout: 5000
})

//封装post方法
/*
function post(url, data){
  axios.post('http://172.28.202.212:8080/VerifyAdmin', data)
    .then(function (response) {
      this.$router.push({ path: '/AdminMovieList' });
    })
    .catch(function (error) {
      console.log(error);
    });
  */

export default service
