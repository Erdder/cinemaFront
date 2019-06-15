<template>
<Card>
  <div>
    <h2 style="text-align: left;float: left">退票策略</h2>
    <Button style="margin-left: 600px; float: left" icon="ios-add" type="default"
            @click="handleAdd">新增方案
    </Button>
  </div>

  <div style="margin-top: 50px">
  <Table :columns="columnInfo" :data="exampleList" style="width: 900px;margin-top: 10px">
    <template slot-scope="{ row, index }" slot="timeLeft">
      <Input type="text" v-model="editTime" v-if="editIndex === index"/>
      <span v-else>{{ row.timeLeft }}</span>
    </template>
    <template slot-scope="{ row, index }" slot="discount">
      <Input type="text" v-model="editDiscount" v-if="editIndex === index"/>
      <span v-else>{{ row.discount }}</span>
    </template>
    <template slot-scope="{ row, index }" slot="actionInfo">
      <div v-if="editIndex === index">
        <Button @click="handleSave(index)">保存</Button>
        <Button @click="editIndex = -1">取消</Button>
        <Button @click="remove(index)">删除</Button>
      </div>
      <div v-else>
        <Button @click="handleEdit(row, index)">编辑</Button>
      </div>
    </template>
  </Table>
</div>

  <Button type="primary" ghost style="margin-right:100px;margin-top: 20px" @click="confirmSubmit">确认提交</Button>
</Card>
</template>

<script>
  import admin from "../api/adminApi";
  export default {
    name: "AdminRefund",
    data() {
      return {
        columnInfo: [
          {
            title: '距电影开场时间',
            slot: 'timeLeft',
          },
          {
            title: '票价折扣',
            slot: 'discount',
          },
          {
            title: '操作',
            slot: 'actionInfo',
          }],
        exampleList: [
          {
            timeLeft: 30,
            discount: 0,
          },
          {
            timeLeft: 60,
            discount: 0.5,
          },
          {
            timeLeft: 90,
            discount: 0.8,
          },
          {
            timeLeft: 120,
            discount: 0.89,
          },
          {
            timeLeft: 150,
            discount: 0.92,
          },
          {
            timeLeft: 250,
            discount: 0.95,
          },
        ],
        editIndex: -1,  //当前聚焦的输入框的行数
        editTime: 0,
        editDiscount: 0,
      }
    },
    created(){
      this.askForRefund();
    },
    methods: {
      askForRefund(){
        //获取已有列表
        var _this = this;
        admin.GetRefund()
          .then(function (response) {
            _this.exampleList = response;
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      handleEdit(row, index) {
        this.editTime = row.timeLeft;
        this.editDiscount = row.discount;
        this.editIndex = index;
      },
      handleSave(index) {
        this.exampleList[index].timeLeft = this.timeLeft;
        this.exampleList[index].discount = this.discount;
        this.editIndex = -1;
      },
      remove(index) {
        this.exampleList.splice(index, 1);
        this.editIndex = -1;
        admin.DeleteAdminVipCard(this.exampleList[index].id);        //调用删除接口
      },

      confirmSubmit() {
        alert("确认提交修改吗？");
        //前端给后端的提交
        admin.UpdateRefund(this.exampleList)
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    }
  }
</script>

<style scoped>

</style>
