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
    <template slot-scope="{ row, index }" slot="quitTime">
      <Input type="text" v-model="editTime" v-if="editIndex === index"/>
      <span v-else>{{ row.quitTime }}</span>
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
</Card>
</template>

<script>
  import axios from "axios";
  export default {
    name: "AdminRefund",
    data() {
      return {
        columnInfo: [
          {
            title: '距电影开场时间',
            slot: 'quitTime',
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
            quitTime: 30,
            discount: 0,
          },
          {
            quitTime: 60,
            discount: 0.5,
          },
          {
            quitTime: 90,
            discount: 0.8,
          },
          {
            quitTime: 120,
            discount: 0.89,
          },
          {
            quitTime: 150,
            discount: 0.92,
          },
          {
            quitTime: 250,
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
        axios.get("GetTicketStrategyList")
          .then(function (response) {
            _this.exampleList = response.data
          })
          .catch(function (error) {
            console.log(error);
          })
      },
      handleAdd(){
        var _this = this;
        this.exampleList.push({
          quitTime:0,
          discount:0,
        });
        var ptr = this.exampleList.length-1;
        axios.post("InsertTicketStrategy",this.exampleList[ptr])
          .then(function (response) {
            _this.$Message.success("新增成功！")
            _this.askForRefund();
          })
          .catch(function (error) {
            _this.$Message.error('新增失败，请重试！');
          })
      },
      handleEdit(row, index) {
        this.editTime = row.quitTime;
        this.editDiscount = row.discount;
        this.editIndex = index;
      },
      handleSave(index) {
        var _this = this;
        this.exampleList[index].quitTime = this.editTime;
        this.exampleList[index].discount = this.editDiscount;
        this.editIndex = -1;
        console.log(this.exampleList[index]);
        axios.post("UpdateTicketStrategy",this.exampleList[index])
          .then(function (response) {
            _this.$Message.success("编辑成功！")
          })
          .catch(function (error) {
            _this.Message.error('编辑失败，请重试！')
          })
      },
      remove(index) {
        var _this = this;
        axios.get("DeleteTicketStrategy?&id="+this.exampleList[index].id)       //todo：这里的id是后端命名的还是前端的
          .then(function (response) {
            _this.$Message.success("删除成功！")
          })
          .catch(function (error) {
           _this.$Message.error('编辑失败，请重试！');
          });
        this.exampleList.splice(index, 1);
        this.editIndex = -1;
      },
    }
  }
</script>

<style scoped>

</style>
