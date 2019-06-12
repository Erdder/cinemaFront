<template>
  <div class="layout">
    <Layout :style="{padding: '0 20px'}">
      <Content :style="{padding: '24px ', minHeight: '280px', background: '#fff'}">
        <Form inline ref="form" :label-width="80"
              style="width: 800px;text-align: left">
    <FormItem label="消费金额" prop="moneySpent" style="width: 200px; text-align: left">
      <Input type="number" v-model="number" placeholder="请输入数字">
        <span slot="append">元</span>
      </Input>
    </FormItem>
          <FormItem label="选择优惠券" style="width:200px;text-align: left;padding-left: 50px">
            <Select v-model="ticketModel" >
              <Option v-for="item in ticketList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          </FormItem>
        </Form>
        <div>
          <Table border ref="selection" :columns="columns" :data="dataAudience"></Table>
          <Button @click="handleSelectAll(true)" style="margin: 20px 10px;">设置全选</Button>
          <Button @click="handleSelectAll(false)" style="margin: 20px ">取消全选</Button>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
  import admin from "../api/adminApi";
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
              title: '姓名',
              key: 'name'
            },
            {
              title: '消费金额',
              key: 'moneySpent'
            },
          ],
          dataAudience: [
            {
              name: 'John Brown',
            moneySpent:1000,
            },
            {
              name: 'Jim Green',
              moneySpent:1000,
            },
            {
              name: 'Joe Black',
              moneySpent:1000,
            },
            {
              name: 'Jon Snow',
              moneySpent:1000,
            }
          ],
          ticketList: [
            {
              value: 'springFestival ',
              label: '春节特惠',
            },
            {
              value: 'spring ',
              label: '春日大放送',
            },
            {
              value: 'summer ',
              label: '夏日大放送',
            }
          ],
          ticketModel: '',

          //获取所有优惠券信息
          CouponAsked: {
            activityName: '',
            activityDescription: '',
            couponName: '',
            couponDescription: '',
            startDate: '',
            endDate: '',
            moneyMustHave: 0,
            moneyGet: 0,
            joinMovieList: [],
          },
          dataList: {
            number: this.number,
            ticketId: this.data(),//错的
          }

        }
      },
      methods: {
        handleSelectAll (status) {
          this.$refs.selection.selectAll(status);
        },
        judgeId(name){
          for( var i=0; i< this.ticketList.length; i++){
            if(name === this.ticketList.name){}
          }
        },

        //写接口
        presentCoupon: function(){
          console.log(addScheduleList);
          axios.post('http://172.28.193.125:8080/InsertSchedule',addScheduleList)
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
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

</style>
