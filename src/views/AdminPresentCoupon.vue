<template>
  <div class="layout">
    <Layout :style="{padding: '0 20px'}">
      <Content :style="{padding: '24px ', minHeight: '280px', background: '#fff'}">
        <Form inline :label-width="80"
              style="width: 1000px;text-align: left">
          <FormItem label="消费金额" prop="moneySpent" style="width: 250px; text-align: left">
            <Input @click.native="searchAudience()" search enter-button type="number" placeholder="请输入金额" v-model="moneySpent" />
              <span slot="append">元</span>
            </Input>
          </FormItem>
          <FormItem label="选择优惠券" style="width:300px;text-align: left;padding-left: 50px">
            <Select v-model="selectedCouponId">
              <Option v-for="item in couponList" :value="item.id" :key="item.id">{{ item.activityName }}</Option>
            </Select>
          </FormItem>
        </Form>
        <div>
          <Table highlight-row border ref="selection" :columns="columns" :data="dataAudience" @on-selection-change="handleRowChange" ></Table>
          <Button @click="handleSelectAll(true)" style="margin: 20px 10px;">设置全选</Button>
          <Button @click="handleSelectAll(false)" style="margin: 20px ">取消全选</Button>
          <Button @click="presentCoupon" type="primary">赠送</Button>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
  import admin from "../api/adminApi";
  import axios from 'axios'

  export default {
    name: "AdminPresentCoupon",
    data() {
      return {
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '客户id',
            key: 'id'
          },
          {
            title: '消费金额',
            key: 'moneySpent'
          },
        ],
        dataAudience: [],
        selectedAudience:[],
        selectedCouponId:'',
        moneySpent:0.0,
        //获取所有优惠券信息
        couponList: {
          activityName: '',
          activityDescription: '',
          startDate: '',
          endDate: '',
          moneyMustHave: 0,
          moneyGet: 0,
          joinMovieList: [],
        },
        }

      },
    created(){
      var _this = this;
      axios.get("GetCoupon")
        .then(function(response) {
          console.log(response.data)
          _this.couponList = response.data
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    methods: {
      handleSelectAll(status) {
        this.$refs.selection.selectAll(status);
      },
      handleRowChange(selection){
        this.selectedAudience = selection;
      },
      searchAudience(){
        var _this = this;
        var money = this.moneySpent
        axios.get("GetUserListByConsumeMoney?&money="+money)
          .then(function(response) {
            _this.dataAudience = []
            console.log(response)
            response.data.data.forEach(audience =>{
              _this.dataAudience.push({
                id:audience,
                moneySpent:'>'+money
              })
            })
          })
          .catch(function(error) {
            console.log(error);
          });
      },
      //写接口
      presentCoupon: function () {
        var _this = this;
        var userIdList = []
        this.selectedAudience.forEach(audience =>{
          userIdList.push(audience.id)
        })
        var selectedCouponId = this.selectedCouponId;
        var data = {
          userIdList:userIdList,
          selectedCouponId:selectedCouponId
        }
        axios.post('PresentCoupon',data)
          .then(function (response) {
            _this.$Message.success("赠送成功！");
          })
          .catch(function (error) {
            console.log(error);
          })
      }
    }
  }
</script>


<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

</style>
