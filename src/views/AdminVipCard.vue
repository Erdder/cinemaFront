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
       <Select v-model="editType" v-if="editIndex === index" style="margin-bottom: 140px; margin-top: 5px">
         <Option v-for="item in cardType" :value="item.value" :key="item.value">{{ item.label }}</Option>
       </Select>
       <span v-else>{{ judgeType(row.level) }}</span>
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
            editDiscount: '',
            editBonus: '',
            editAmount:'',
            editType:'',
            cardType:[
              {
              value:1,
              label:"至尊卡"
              },
              {
                value:2,
                label:"黄金卡"
              },
              {
                value:3,
                label:"白银卡"
              },
              {
                value:4,
                label:"青铜卡"
              }],
            //这是包含id的所有信息（前后端接口数据
            baseInfo:[
            ],

          }
      },

      methods:{
        searchVipCard(){
          var that = this;
          axios.get("GetAdminVipCard")
            .then(function(response) {
              console.log(response)
              that.baseInfo = response.data;
            })
            .catch(function(error) {
              console.log(error);
            });
        },
        handleEdit (row, index) {
          this.editAmount = row.chargeMoney;
          this.editBonus = row.bonus;
          this.editDiscount = row.discount;
          this.editType = row.level
          this.editIndex = index;
        },
        handleSave (index) {
          var _this = this;
          this.baseInfo[index].chargeMoney = this.editAmount;
          this.baseInfo[index].bonus = this.editBonus;
          this.baseInfo[index].discount = this.editDiscount;
          this.baseInfo[index].level = this.editType;
          this.editIndex = -1;
          for(var i=0;i<this.cardType.length;i++){
            if(this.baseInfo[index].level === this.cardType[i].value){
              this.baseInfo[index].levelDetails = this.cardType[i].label
            }
          }
          axios.post("UpdateAdminVipCard",this.baseInfo[index])
            .then(function (response) {
              _this.$Message.success("编辑成功！")
            })
            .catch(function (error) {
              console.log(error);
            })
        },
        remove (index) {
          var _this = this;
          axios.get("DeleteAdminVipCard?&id="+this.baseInfo[index].adminVipCardId)
            .then(function (response) {
              _this.$Message.success("删除成功！")
            })
            .catch(function (error) {
              console.log(error);
            });
          this.baseInfo.splice(index,1);
          this.editIndex = -1;
  },
        handleAdd(){
          var _this = this;
          this.baseInfo.push({
            chargeMoney:0,
            bonus:0,
            discount:0,
            level:1,
            levelDetails:'至尊卡'
          });
          var ptr = this.baseInfo.length-1
          axios.post("InsertAdminVipCard",this.baseInfo[ptr])
            .then(function (response) {
              _this.$Message.success("新增成功！")
              _this.searchVipCard()
            })
            .catch(function (error) {
              console.log(error);
            })
        },

        judgeType(level){
          var type = "";
          if( level === 1){
            type = "至尊卡"
          }else if( level === 2){
            type = "黄金卡"
          }else if( level === 3){
            type = "白银卡"
          }else if(level === 4){
            type = "青铜卡"
          }
          return type;
        },
        },
      created() {
       this.searchVipCard();
      }
    }
</script>

<style scoped>

</style>
