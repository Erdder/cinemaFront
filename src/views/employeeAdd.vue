<template>
  <div class="layout">
    <Layout :style="{padding: '0 20px'}">
      <Content :style="{padding: '24px ', minHeight: '280px', background: '#fff'}">
        <h1 style="text-align: left">新增员工</h1>
        <Card style="width:400px;height:300px">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="70"
                style="width: 500px">
            <FormItem label="员工姓名" prop="name" style="width: 300px">
              <Input v-model="formValidate.name" placeholder=""></Input>
            </FormItem>
            <FormItem label="员工职位" prop="type" style="width: 300px">
              <Select v-model="formValidate.type" placeholder="">
                <Option value="ticketSeller">售票员</Option>
                <Option value="cleaner">清洁工</Option>
                <Option value="large">大厅</Option>
                <Option value="huge">超大厅</Option>
              </Select>
            </FormItem>
            <FormItem label="员工工号" prop="number" style="width: 300px">
              <Input v-model="formValidate.number" placeholder="请输入员工工号" clearable/>
            </FormItem>

            <FormItem style="padding-left:50px;text-align: left">
              <Button type="primary" ghost  style="height:30px;width: 55px" @click="addHall">确认</Button>
              <Button  style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </Card>
      </Content>
    </Layout>
  </div>

</template>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }

  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }

  .layout-footer-center {
    text-align: center;
  }
</style>

<script>
  import axios from "axios"
  export default {
    name: "EmployeeAdd",
    data() {
      return {
        formValidate: {
          name: '',
          type: '',
       number:19061301,
        },

        ruleValidate: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ],
          type: [
            {required: true, type: 'string', min: 1, message: '请至少选择一种', trigger: 'change'},
          ],
         number: [
            {
              required: true, type:'number', min: 8,max: 8, message: '请填入8位工号', trigger: 'change'
            }
          ],
        },
      }
    },

    methods: {
      judgeSize(type){
        var retSize = 0;
        if( type === '售票员' ){
          retSize = 1;
        }else if(type === '清洁工' ){
          retSize = 2;
        }else if ( type === '大厅'){
          retSize = 12;
        }else{
          retSize = 13;
        }
        return retSize
      },
      addHall: function() {
        //前端要给后端的输入
        var addEmployee = {
          id: 1,
          name: this.formValidate.name,
          type: this.judgeSize(this.formValidate.type),
          number: this.formValidate.number
        }
        console.log(addEmployee)
        axios.post('http://172.28.193.125:8080/InsertHall',addEmployee)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    },
  }
</script>
