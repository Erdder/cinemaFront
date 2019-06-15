<template>
  <Card >
    <div>
      <h2 style="text-align: left;float: left">会员卡信息</h2>
      <Button style="margin-left: 600px; float: left" icon="ios-add" type="default"
              @click="handleAdd">新增方案
      </Button>
    </div>
   <div style="margin-top: 50px">
     <Table border :columns="columns" :data="baseInfo" style="width: 900px;margin-top: 10px">
     <template slot-scope="{ row, index }" slot="chargeMoney">
       <Input type="text" v-model="editAmount" v-if="editIndex === index" />
       <span v-else>{{ row.chargeMoney }}</span>
     </template>
     <template slot-scope="{ row, index }" slot="bonus">
       <Input type="text" v-model="editBonus" v-if="editIndex === index" />
       <span v-else>{{ row.bonus }}</span>
     </template>
     <template slot-scope="{ row, index }" slot="discount">
       <Input type="text" v-model="editDiscount" v-if="editIndex === index" />
       <span v-else>{{ row.discount }}</span>
     </template>
     <template slot-scope="{ row, index }" slot="type">
       <Input type="text" v-model="editType" v-if="editIndex === index" />
       <span v-else>{{ this.judgeType(row.type) }}</span>
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
   </div>

    <Button type="primary" ghost style="margin-right:200px;margin-top: 20px" @click="confirmSubmit">确认提交</Button>

  </Card>


</template>

<script>
  import admin from "../api/adminApi";
    export default {
        name: "AdminVipCard",
      data(){
          return{
            columns: [
              {
                title: '充值金额',
                slot: 'chargeMoney',
                width: 100,
              },
              {
                title: '满赠金额',
                slot: 'bonus',
                width:150
              },
              {
                title:'购票折扣',
                slot:'discount',
              },
              {
                title:'会员卡种类',
                slot:'type',
              },
              {
                title: '操作',
                slot: 'action',

              }
            ],
            editIndex: -1,            //当前聚焦的输入框的行数
            editName: '',
            editBonus: '',

            //这是包含id的所有信息（前后端接口数据
            baseInfo:[
          {
            id: 1,
            level:1,
            chargeMoney: 60,
            bonus: 5,
            discount: 0.95
          },
          {
            id: 1,
            level:1,
            chargeMoney: 300,
            bonus: 30,
            discount: 0.9
          },
          {
            id: 1,
            level:1,
            chargeMoney: 500,
            bonus: 100,
            discount: 0.88
          },
          {
            id: 1,
            level:1,
            chargeMoney: 1000,
            bonus: 200,
            discount: 0.8
          },
            ],

          }
      },
      created(){
        this.askForVipCard();
      },

      methods:{
        //加载页面时得到已有的数据
        askForVipCard(){
          var _this = this;
          admin.GetAdminVipCard()
            .then(function (response) {
              _this.baseInfo = response;
            })
            .catch(function (error) {
              console.log(error);
            })
        },
        handleEdit (row, index) {
          this.editAmount = row.chargeMoney;
          this.editBonus = row.bonus;
          this.editIndex = index;
          this.editDiscount = row.discount;
        },
        handleSave (index) {
          this.baseInfo[index].chargeMoney = this.editAmount;
          this.baseInfo[index].bonus = this.editBonus;
          this.baseInfo[index].discount = this.editDiscount;
          this.editIndex = -1;
        },
        remove (index) {
          this.baseInfo.splice(index,1);
          this.editIndex = -1;
          admin.DeleteAdminVipCard(this.baseInfo[index].id);        //调用删除接口
  },
        handleAdd(){
          this.baseInfo.push({
            chargeMoney:0,
            bonus:0,
            discount:0,
            type:"青铜卡",
          });
          /*
          var simpleData:{};
          admin.InsertAdminVipCard(this.baseInfo[index].);        //调用新增接口
          */
        },

        judgeType(level){
          var type = "";
          if( level === 1){
            type = "至尊卡"
          }else if( level === 2){
            type = "黄金卡"
          }else if( level === 3){
            type = "白银卡"
          }else if( level === 4){
            type = "青铜卡"
          }
          return type;
        },

        confirmSubmit(){
          alert("确认提交修改吗？");
          //前端给后端的提交
          admin.UpdateAdminVipCard(this.baseInfo)
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
