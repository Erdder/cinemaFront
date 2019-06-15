<template>
  <div class="container">
    <Card style="width:450px; margin: 80px auto;  background: rgba(255,255,255,0.5)">
      <p slot="title">
        <Icon type="md-contact"></Icon>
        影院员工注册
      </p>
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
        <Tooltip placement="right" content="工号需有效 !">
          <FormItem label="员工工号" prop="name" style="margin-left: 0">
            <Input type="text" v-model="formCustom.jobNumber" placeholder="请输入员工工号"></Input>
          </FormItem>
        </Tooltip>

        <FormItem label="密码" prop="passwd">
          <Input type="password" v-model="formCustom.passwd"></Input>
        </FormItem>
        <FormItem label="确认密码" prop="passwdCheck">
          <Input type="password" v-model="formCustom.passwdCheck"></Input>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')" style="margin:10px 0 auto 10px">注册</Button>
          <Button @click="handleReset('formCustom')" style="margin:10px 50px auto 10px">重置</Button>
        </FormItem>
      </Form>

    </Card>
  </div>
</template>

<script>
  import admin from "../api/adminApi"
  export default {
    name: "AdminRegister",
    data() {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'))
        } else {
          if (this.formCustom.passwdCheck !== '') {
            // 对第二个密码框单独验证
            this.$refs.formCustom.validateField('passwdCheck')
          }
          callback()
        }
      };
      const validatePassCheck = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.formCustom.passwd) {
          callback(new Error('两次密码不一致！'));
        } else {
          callback();
        }
      };
      const validateName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('用户名不能为空'));
        }else{
          this.checkJobNumber();
        }
      };

      return {
        formCustom: {
          jobNumber: '',
          passwd: '',
          passwdCheck: '',
        },
        ruleCustom: {
          name: [
            {validator: validateName, trigger: 'blur'}
          ],
          passwd: [
            {validator: validatePass, trigger: 'blur'}
          ],
          passwdCheck: [
            {validator: validatePassCheck, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      handleSubmit(name) {
       /* this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('Success!');
          } else {
            this.$Message.error('Fail!');
          }
        });*/

        //调用接口发送给后端
        var jobnumber = this.formCustom.jobNumber;
        var psd = this.formCustom.passwd;
        var _this = this;
        var data = {
          jobNumber:jobnumber,
          password: psd,
        };

        //注册接口
       admin.AdminRegister(data)
          .then(res => {
            _this.$router.push({path: '/AdminMovieList'});
          })
          .catch(err => {
            console.log(err);
          });
      },

      checkJobNumber(){
        admin.checkJobNumber(this.formCustom.name)
          .then( res => {
            alert("有效工号！")
          })
          .catch(err =>{
            alert("┗|｀O′|┛ 嗷~~无效工号！")
          });
      },
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
