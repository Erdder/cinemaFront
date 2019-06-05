<template>
  <Card >
    <h3 style="text-align: left">会员卡信息</h3>

      <Button type="default" @click="handleAdd">
        <Icon type="ios-add"></Icon>
        新增方案
      </Button>
    <Table border :columns="columns" :data="baseInfo" style="width: 500px;margin-top: 10px">
      <template slot-scope="{ row, index }" slot="amount">
        <Input type="text" v-model="editAmount" v-if="editIndex === index" />
        <span v-else>{{ row.amount }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="plan">
        <Input type="text" v-model="editPlan" v-if="editIndex === index" />
        <span v-else>{{ row.plan }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="discount">
        <Input type="text" v-model="editDiscount" v-if="editIndex === index" />
        <span v-else>{{ row.discount }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="action">
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
    <Button type="primary" ghost style="margin-right:500px;margin-top: 20px" @click="confirmSubmit">确认提交</Button>

  </Card>


</template>

<script>
  import axios from "axios";
    export default {
        name: "AdminVipCard",
      data(){
          return{
            columns: [
              {
                title: '充值金额',
                slot: 'amount',
                width: 100,
              },
              {
                title: '满赠金额',
                slot: 'plan',
                width:150
              },
              {
                title:'购票折扣',
                slot:'discount',
              },
              {
                title: '操作',
                slot: 'action',

              }
            ],
            baseInfo: [
              {
                amount: 60,
                plan: 5,
                discount: 88
              },
              {
                amount: 300,
                plan: 30,
                discount: 88
              },
              {
                amount: 500,
                plan: 100,
                discount: 88
              },
              {
                amount: 1000,
                plan: 200,
                discount: 88
              },
            ],
            editIndex: -1,  //当前聚焦的输入框的行数
            editName: '',
            editPlan: '',

            cardList:[

            ]
          }
      },
      created(){
        this.askForVipCard;
      },
      methods:{
        //加载页面时得到已有的数据
        askForVipCard: function (){
          var _this = this;
          axios.post('http://192.168.2.149:8080/InsertAdminVipCard',)
            .then(function (response) {
              _this.baseInfo = response;
            })
            .catch(function (error) {
              console.log(error);
            })
        },
        handleEdit (row, index) {
          this.editAmount = row.amount;
          this.editPlan = row.plan;
          this.editIndex = index;
          this.editDiscount = row.discount;
        },
        handleSave (index) {
          this.baseInfo[index].amount = this.editAmount;
          this.baseInfo[index].plan = this.editPlan;
          this.baseInfo[index].discount = this.editDiscount;
          this.editIndex = -1;
        },
        remove (index) {
          console.log(this.baseInfo[index]);
          console.log(index);
          //this.$delete(this.baseInfo,index),
          this.baseInfo.splice(index,1);
  },
        handleAdd(){
          this.baseInfo.push({
            amount:0,
            plan:0,
            discount:0,
          })
        },


        confirmSubmit(){
          alert("确认提交修改吗？");
          console.log(this.cardList)
          //前端给后端的提交
          axios.post('/'  ,this.baseInfo)
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

<style scoped>

</style>
