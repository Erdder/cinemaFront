<template>
  <Card style="width:450px;margin: 100px auto">
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
        <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
  import adminApi from '../api/adminApi'
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
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        });
        var xmlhttp = new XMLHttpRequest();
        var _this = this;
        xmlhttp.onreadystatechange = function () {
          if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            if (JSON.parse(xmlhttp.responseText)) {

            }
          }
        };
        xmlhttp.open('POST', 'http://localhost:8082/VerifyAdmin', false);
        xmlhttp.setRequestHeader("Content-type", "application/json; charset=utf-8");
        xmlhttp.send();
      },

      created() {
        adminApi.VerifyAdmin(
          {
            username: '',
            password: '',
          },
          (res) => {
            this.$emit('header', false);
          }
        )
      },
    }
  }
</script>

<style scoped>

</style>
