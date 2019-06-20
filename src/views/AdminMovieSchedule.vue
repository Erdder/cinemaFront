<template>
  <Card style="width:1000px;padding-left: 80px">
    <Form inline style="padding-left: 20px;">
      <Row>
        <Col span="8">
      <FormItem label="选择电影" style="width:200px;margin-right: 150px;text-align: left">
        <Select v-model="movieModel">
          <Option v-for="item in movieList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      </Col>
      <Col span="8">
      <FormItem label="选择日期" style="width:200px;margin-right: 150px">
            <DatePicker
              type="daterange"
              :options="options2"
              v-model="dateValue"
              placement="bottom-end"
              placeholder="请选择日期"
              style="width: 200px"
            ></DatePicker>
      </FormItem>
      </Col>
      <Col span="8">
      <FormItem label="选择影厅" style="width:200px;margin-right: 150px;text-align: left">
        <Select v-model="hallModel">
          <Option v-for="item in hallList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      </Col>
      </Row>
      <Row>
        <Col span="8">
      <FormItem label="场次票价" style="width:200px;margin-right: 150px">
        <Input
          v-model="ticketValue"
          prefix="logo-yen"
          placeholder="请输入数字"
          style="width: 200px"
          type="number"
        />
      </FormItem>
        </Col>
        <Col span="8">
      <FormItem label="电影时间" style="width:200px;margin-right: 150px;text-align: left">
        <TimePicker v-model="timeValue" type="timerange" placement="bottom-end" placeholder="选择时间" style="width: 168px"></TimePicker>
      </FormItem>
        </Col>
      </Row>
      <Form style="text-align: center">
        <FormItem>
          <Button type="primary" @click="addSchedule" style="margin-right: 50px">确认</Button>
          <Button @click="handleReset('formValidate')" style="margin-right: 180px">重置</Button>
        </FormItem>
      </Form>
    </Form>
  </Card>
</template>

<script>
import axios from "axios";
export default {
  name: "adminMovieSchedule",
  data() {
    return {
      movieList: [
        {
          name: "fdsf",
          id: 123
        }
      ],
      hallList: [
        {
          name: "fdsfd",
          id: "fsdfds"
        }
      ],
      movieModel: "",
      hallModel: "",
      options2: {
        shortcuts: [
          {
            text: "1 week",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              return [start, end];
            }
          },
          {
            text: "1 month",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              return [start, end];
            }
          },
          {
            text: "3 months",
            value() {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              return [start, end];
            }
          }
        ]
      },
      ticketValue: "",
      timeValue: [],
      dateValue:[]
    };
  },
  methods: {
    addSchedule: function() {
      var _this = this;
      //前端给后端的输入
      var addScheduleList = {
        hallId: this.hallModel,
        movieId: this.movieModel,
        startTime: new Date().format("yyyy-MM-dd")+'T'+this.timeValue[0]+'.0000',
        endTime: new Date().format("yyyy-MM-dd")+'T'+this.timeValue[1]+'.0000',
        price: this.ticketValue,
        startOnSaleDate:this.dateValue[0].format("yyyy-MM-dd"),
        endOnSaleDate:this.dateValue[1].format("yyyy-MM-dd"),
      };
      console.log(addScheduleList);
      axios
        .post("InsertSchedule", addScheduleList)
        .then(function(response) {
          _this.$Message.success("新增排片成功！");
        })
        .catch(function(error) {
          _this.$Message.error("新增失败，请重试！");
        });
    }
  },
  created() {
    let _this = this;
    axios
      .get("GetHallList")
      .then(function(response) {
        console.log(response.data);
        _this.hallList = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get("GetMovieList")
      .then(function(response) {
        console.log(response.data);
        _this.movieList = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
    Date.prototype.format = function(fmt)
    {
      var o = {
        "M+" : this.getMonth()+1,                 //月份
        "d+" : this.getDate(),                    //日
        "h+" : this.getHours(),                   //小时
        "m+" : this.getMinutes(),                 //分
        "s+" : this.getSeconds(),                 //秒
        "q+" : Math.floor((this.getMonth()+3)/3), //季度
        "S"  : this.getMilliseconds()             //毫秒
      };
      if(/(y+)/.test(fmt))
        fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
      for(var k in o)
        if(new RegExp("("+ k +")").test(fmt))
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      return fmt;
    }
  }
};
</script>

<style scoped>
</style>
