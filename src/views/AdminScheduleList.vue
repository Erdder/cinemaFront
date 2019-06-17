<template>
  <Form :model="formItem" :label-width="80" style="margin: 20px 0 20px 40px">
    <Row>
      <Col span="7">
        <FormItem label="选择影厅" style="width: 250px">
          <Select v-model="formItem.selectHall">
            <Option v-for="item in hallList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
      </Col>
      <Col span="6">
        <FormItem label="选择电影" style="width: 250px">
          <Select v-model="formItem.selectMovie">
            <Option v-for="item in MovieList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
      </Col>
    </Row>

    <FormItem label="选择日期">
      <Row>
        <Col span="5">
          <DatePicker
            type="daterange"
            confirm
            placement="bottom-end"
            placeholder="请选择日期范围"
            v-model="formItem.date"
          ></DatePicker>
        </Col>
        <Col span="1" style="text-align: center">-</Col>
        <Col span="5">
          <TimePicker
            format="HH:mm"
            type="timerange"
            placement="bottom-end"
            placeholder="请选择时间范围（可选）"
            v-model="formItem.time"
            style="width: 168px"
          ></TimePicker>
        </Col>
      </Row>
    </FormItem>
    <div class="card" style="margin-top: 20px">
      <div class="schedule-date-container">
        <div
          class="schedule-date"
          v-for="item in dateList"
          :value="item.value"
          :key="item.value"
        >{{ item.label }}</div>
        <Option v-for="item in hallList" :value="item.id" :key="item.id">{{ item.name }}</Option>
      </div>
      <div class="schedule-container">
        <ul class="schedule-time-line">
          2019/9/1
          <li class="schedule-time-item">00:00</li>
          <li class="schedule-time-item">06:00</li>
          <li class="schedule-time-item">12:00</li>
          <li class="schedule-time-item">18:00</li>
          <li class="schedule-time-item">24:00</li>
        </ul>
        <ul class="schedule-item-line"></ul>
      </div>
    </div>
  </Form>
</template>

<script>
import adminApi from "../api/adminApi";
import axios from "axios";

export default {
  name: "AdminScheduleList",
  data() {
    return {
      formItem: {
        selectHall: "",
        selectMovie: "",
        date: [],
        time: []
      },

      dateList: [
        {
          value: "",
          label: ""
        }
      ],

      //前端给后端排片搜索条件
      searchCondition: [
        {
          startDate: 2019,
          endDate: 2020,
          hallId: 1,
          movieId: 112
        }
      ],

      //后端要首先给前端影厅和电影名列表
      hallList: [
        {
          name: "",
          id: ""
        }
      ],
      MovieList: [
        {
          name: "",
          id: ""
        }
      ],

      //给完搜索条件后，后端给前端的数据
      retList: [
        {
          id: "", //排片ID
          hallId: "",
          hallName: "",
          movieId: "",
          movieName: "",
          startTime: "",
          endTime: "",
          fare: ""
        }
      ]
    };
  },

  methods: {
    searchSchedul() {
      var dataToPost = {
        startDate: this.formItem.date[0],
        endDate: this.formItem.date[1],
        startTime: this.formItem.time[0],
        endTime: this.formItem.time[1],
        hallId: this.formItem.selectHall,
        movieId: this.formItem.selectMovie
      };
      console.log("获取排片所需信息", dataToPost);
      axios
        .get("GetScheduleList", { params: dataToPost })
        .then(function(response) {
          _this.data = response;
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  created() {
    var _this = this;
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
        _this.MovieList = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>
<style scoped>
.schedule-container {
  display: flex;
  padding: 0 20px;
}

.schedule-time-line {
  width: 80px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.schedule-item-line {
  height: 960px;
  width: 150px;
  border-left: 1px solid #ccc;
  position: relative;
}

.schedule-item {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  position: absolute;
  overflow-y: scroll;
}

.schedule-date-container {
  padding-left: 100px;
  height: 40px;
  line-height: 30px;
  display: flex;
}

.schedule-date {
  width: 150px;
  text-align: center;
}
</style>
