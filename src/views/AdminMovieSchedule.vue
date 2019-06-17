<template>
  <Card style="width:1000px;padding-left: 80px">
    <Form inline style="padding-left: 20px">
      <FormItem label="选择电影" style="width:200px;margin-right: 150px;text-align: left">
        <Select v-model="movieModel">
          <Option v-for="item in movieList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="选择日期" style="width:200px;margin-right: 150px">
        <Row>
          <Col span="20">
            <DatePicker
              type="daterange"
              :options="options2"
              placement="bottom-end"
              placeholder="请选择日期"
              style="width: 200px"
            ></DatePicker>
          </Col>
        </Row>
      </FormItem>
      <FormItem label="选择影厅" style="width:200px;margin-right: 150px;text-align: left">
        <Select v-model="hallModel">
          <Option v-for="item in hallList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </FormItem>
      <FormItem label="场次票价" style="width:200px;margin-right: 150px">
        <Input
          v-model="ticketValue"
          prefix="logo-yen"
          placeholder="请输入数字"
          style="width: 200px"
          type="number"
        />
      </FormItem>
      <FormItem label="电影时间" style="width:400px;margin-right: 300px;text-align: left">
        <el-time-picker
          is-range
          arrow-control
          size="small"
          default-value
          v-model="timeValue"
          range-separator="-"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          placeholder="选择时间范围"
        ></el-time-picker>
      </FormItem>
      <Form>
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
      timeValue: ""
    };
  },
  methods: {
    addSchedule: function() {
      //前端给后端的输入
      var addScheduleList = {
        hallId: this.hallModel,
        movieId: this.movieModel,
        startTime: this.timeValue[0],
        endTime: this.timeValue[1],
        price: this.ticketValue
      };
      console.log(addScheduleList);
      axios
        .post("InsertSchedule", addScheduleList)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
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
  }
};
</script>

<style scoped>
</style>
