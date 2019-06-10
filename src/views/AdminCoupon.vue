<template>
  <Layout :style="{padding: '0 20px'}">
    <Content :style="{padding: '24px ', minHeight: '280px', background: '#fff'}">
      <div>
        <h2 style="text-align: left;float: left">优惠活动</h2>
        <Button style="margin-left: 700px; float: left" icon="md-add-circle" type="primary"
                @click="addCouponVisible = true">发布活动
        </Button>
      </div>
      <div v-for="coupon in couponList" :key="coupon" style="margin-top: 40px; float: left">
        <Card style="height: 220px; width:420px;margin: 10px">
          <p slot="title" style="text-align: left; height: 25px">
            <Icon type="ios-card-outline"></Icon>
            {{coupon.activityName}}
          </p>
          <div id="couponBox">
            <h3>{{coupon.couponName}}</h3>
            <h4>{{'满'+coupon.moneyMustHave+'减'+coupon.moneyGet}}</h4>
          </div>
          <div style="width: 750px; text-align: justify">
            <p>{{coupon.activityDescription}}</p>
            <p><strong>起止日期：</strong>{{coupon.startDate+' 至 '+coupon.endDate}}</p>
            <p><strong>参与电影：</strong></p>
            <div v-for="movie in coupon.joinMovieList" :key="movie" style="float: left">
              <Tag color="cyan">{{movie.name}}</Tag>
            </div>
          </div>
        </Card>
      </div>
      <Modal
        v-model="addCouponVisible"
        title="发布活动"
        @on-ok="addCoupon"
        @on-cancel="cancelAddCoupon">
        <div style="text-align: left; width: 80%; margin-left: 10%">
          <Form :model="addCouponForm" :label-width="100">
            <FormItem label="活动名称" required>
              <Input v-model="addCouponForm.activityName" placeholder="请输入活动名称"></Input>
            </FormItem>
            <FormItem label="活动描述">
              <Input v-model="addCouponForm.activityDescription" placeholder="请输入活动描述"></Input>
            </FormItem>
            <FormItem label="优惠券名称" required>
              <Input v-model="addCouponForm.couponName" placeholder="请输入活动名称"></Input>
            </FormItem>
            <FormItem label="优惠券描述">
              <Input v-model="addCouponForm.couponDescription" placeholder="请输入活动描述"></Input>
            </FormItem>
            <FormItem label="开始日期" required="">
              <DatePicker v-model="addCouponForm.startDate" type="date" placement="bottom-end" placeholder="选择开始日期"
                          style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="结束日期" required="">
              <DatePicker v-model="addCouponForm.endDate" type="date" placement="bottom-end" placeholder="选择结束日期"
                          style="width: 200px"></DatePicker>
            </FormItem>
            <FormItem label="需满金额" required="">
              <InputNumber
                :max="10000"
                v-model="addCouponForm.moneyMustHave"></InputNumber>
            </FormItem>
            <FormItem label="优惠金额" required="">
              <InputNumber
                :max="10000"
                v-model="addCouponForm.moneyGet"
              ></InputNumber>
            </FormItem>
            <FormItem label="参与电影" required>
              <Select v-model="addCouponForm.joinMovieList" style="width:200px" multiple>
                <Option v-for="item in movieOption" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
          </Form>
        </div>
      </Modal>
    </Content>
  </Layout>
</template>

<script>
  import axios from "axios"

  export default {
    name: "AdminCoupon",
    created() {
      var _this = this;
      axios.get('http://172.28.193.125:8080/getMovieList')
        .then(function (response) {
          _this.movieOption = response;
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    data() {
      return {
        couponList: [
          {
          activityName: '春季嘉年华',
          activityDescription: '在春光中和朋友恋人享受快乐的电影！',
          couponName: '电影补贴',
          couponDescription: '给贫穷的吃土人士的一点福利',
          startDate: '2019-6-3',
          endDate: '2019-8-4',
          moneyMustHave: 50,
          moneyGet: 8,
          joinMovieList: [{
            id: '1',
            name: '夏目友人帐',
            description: '在人与妖怪之间过着忙碌日子的夏目，偶然与以前的同学结城重逢，由此回忆起了被妖怪缠身的苦涩记忆。此时，夏目认识了在归还名字的妖怪记忆中出现的女性·津村容莉枝。和玲子相识的她，现在和独子椋雄一同过着平稳的生活。夏目通过与他们的交流，心境也变得平和。但这对母子居住的城镇，却似乎潜伏着神秘的妖怪。在调查此事归来后，寄生于猫咪老师身体的“妖之种”，在藤原家的庭院中，一夜之间就长成树结出果实。而吃掉了与自己形状相似果实的猫咪老师，竟然分裂成了3个',
            posterUrl: '../../static/logo.png',
            director: '大森贵弘 /伊藤秀樹',
            starring: '神谷浩史 /井上和彦 /高良健吾 /小林沙苗 /泽城美雪',
            type: '动画',
            country: '日本',
            language: '日语',
            startDate: '2019/4/4',
            duration: '90',
            status: 1
          },{
            id: '1',
            name: '夏目友人帐',
            description: '在人与妖怪之间过着忙碌日子的夏目，偶然与以前的同学结城重逢，由此回忆起了被妖怪缠身的苦涩记忆。此时，夏目认识了在归还名字的妖怪记忆中出现的女性·津村容莉枝。和玲子相识的她，现在和独子椋雄一同过着平稳的生活。夏目通过与他们的交流，心境也变得平和。但这对母子居住的城镇，却似乎潜伏着神秘的妖怪。在调查此事归来后，寄生于猫咪老师身体的“妖之种”，在藤原家的庭院中，一夜之间就长成树结出果实。而吃掉了与自己形状相似果实的猫咪老师，竟然分裂成了3个',
            posterUrl: '../../static/logo.png',
            director: '大森贵弘 /伊藤秀樹',
            starring: '神谷浩史 /井上和彦 /高良健吾 /小林沙苗 /泽城美雪',
            type: '动画',
            country: '日本',
            language: '日语',
            startDate: '2019/4/4',
            duration: '90',
            status: 1
          }],
        },
          {
          activityName: '春季嘉年华',
          activityDescription: '在春光中和朋友恋人享受快乐的电影！',
          couponName: '电影补贴',
          couponDescription: '给贫穷的吃土人士的一点福利',
          startDate: '2019-6-3',
          endDate: '2019-8-4',
          moneyMustHave: 50,
          moneyGet: 8,
          joinMovieList: [{
            id: '1',
            name: '夏目友人帐',
            description: '在人与妖怪之间过着忙碌日子的夏目，偶然与以前的同学结城重逢，由此回忆起了被妖怪缠身的苦涩记忆。此时，夏目认识了在归还名字的妖怪记忆中出现的女性·津村容莉枝。和玲子相识的她，现在和独子椋雄一同过着平稳的生活。夏目通过与他们的交流，心境也变得平和。但这对母子居住的城镇，却似乎潜伏着神秘的妖怪。在调查此事归来后，寄生于猫咪老师身体的“妖之种”，在藤原家的庭院中，一夜之间就长成树结出果实。而吃掉了与自己形状相似果实的猫咪老师，竟然分裂成了3个',
            posterUrl: '../../static/logo.png',
            director: '大森贵弘 /伊藤秀樹',
            starring: '神谷浩史 /井上和彦 /高良健吾 /小林沙苗 /泽城美雪',
            type: '动画',
            country: '日本',
            language: '日语',
            startDate: '2019/4/4',
            duration: '90',
            status: 1
          },],
        }
        ],
        addCouponForm: {
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
        addCouponVisible: false,
        movieOption: [],
      }
    },
    methods: {
      addCoupon() {
        var _this = this;
        axios.get('http://172.28.193.125:8080/insertCoupon', this.addCouponForm)
          .then(function (response) {
            _this.$Message.info(response);
          })
      },
      cancelAddCoupon() {
        this.addCouponForm = {
          activityName: '',
          activityDescription: '',
          couponName: '',
          couponDescription: '',
          startDate: '',
          endDate: '',
          moneyMustHave: 0,
          moneyGet: 0,
          joinMovieList: [],
        }
      },
    }
  }
</script>

<style scoped>
  #couponBox {
    text-align: left;
    float: right;
    width: 100px;
    height: 130px;
    margin: -17px;
    background: #ffc853;
    border: dashed;
    padding: 3px;
    line-height: 30px;
  }
</style>
