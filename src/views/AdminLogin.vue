<template>
  <div class="container">
    <Card style="width:450px;margin: 100px auto; background: rgba(255,255,255,0.5)">
      <p slot="title">
        <Icon type="md-contact"></Icon>
        管理员登录
      </p>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="user">
          <Input type="text" v-model="formInline.user" size="large" placeholder="Username">
            <Icon type="ios-person-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input type="password" v-model="formInline.password" size="large" placeholder="Password">
            <Icon type="ios-lock-outline" slot="prepend"></Icon>
          </Input>
        </FormItem>
        <FormItem>
          <a href="http://localhost:8080/#/AdminRegister">还没有账号？点此注册！</a>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formInline')" onclick="">登录</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>

<script>
  import axios from "axios"
import admin from "../api/adminApi"
  export default {
    name: "Login",
    data() {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            {required: true, message: 'Please fill in the user name', trigger: 'blur'}
          ],
          password: [
            {required: true, message: 'Please fill in the password.', trigger: 'blur'},
            {type: 'string', min: 6, message: 'The password length cannot be less than 6 bits', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit(name) {
        console.log(this.$refs);
        this.$refs[name].validate((valid) => {
          if (!valid) {
            this.$Message.error('账号或密码格式错误!');
          }
        });

        var user = this.formInline.user;
        var psd = this.formInline.password;
        var _this = this;
        var data = {
          username: user,
          password: psd,
        };

        this.$api.admin.VerifyAdmin(data)
          .then( res => {
            _this.$router.push({ path: '/AdminMovieList'});
        })
      .catch(err =>{
          console.log(err);
        });
/*

          adminApi.VerifyAdmin(data)
            .then(res =>{
            _this.$router.push({ path: '/AdminMovieList'});
          })
            .catch(err =>{
              console.log(error);
            });

        console.log(axios);
        axios.post('http://172.28.193.117:8080/VerifyAdmin', data)
          .then(function (response) {
            console.log(response);
            //console.log($router);
            _this.$router.push({ path: '/AdminMovieList'});
          })
          .catch(function (error) {
            // console.log(error);
          });

*/
      }
    }
  }
</script>

<style scoped>
  .container {
    height: 100%;
    width: 100%;
    position: fixed;
    background-image: url("../assets/login_background.jpg");
    background-repeat: no-repeat;
    background-size: 100%;
    background-position: center;
  }

</style>
