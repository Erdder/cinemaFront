<template>
  <div>
    <Form :model="formItem" :label-width="80" style="margin: 20px 0px 20px 40px">
      <Row>
        <Col span="7">
        <FormItem label="选择影厅" style="width: 250px">
          <Select v-model="formItem.selectHall">
            <Option v-for="item in hallList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="7">
        <FormItem label="选择电影" style="width: 250px">
          <Select v-model="formItem.selectMovie">
            <Option v-for="item in MovieList" :value="item.id" :key="item.id">{{ item.name }}</Option>
          </Select>
        </FormItem>
        </Col>
        <Col span="10">
        <FormItem label="选择日期">
          <DatePicker
            type="daterange"
            confirm
            placement="bottom-end"
            placeholder="请选择日期范围"
            v-model="formItem.date"
          ></DatePicker>
          <Button shape="circle" icon="ios-search" @click="searchSchedule">确认搜索</Button>
        </FormItem>
        </Col>
      </Row>
    </Form>
    <!--
    <div class="card" style="margin-top: 20px">
      <div class="schedule-date-container">
        <div
          class="schedule-date"
          v-for="item in dateList"
          :value="item.value"
          :key="item.value"
        >{{ item.label }}
        </div>
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
    -->
    <div id="schedule-list" style="margin:auto;width: 900px;height: 480px"></div>
  </div>
</template>

<script>
  import adminApi from "../api/adminApi";
  import axios from "axios";
  import echarts from "echarts";

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
        scheduleList: {
          dateRange:[],
        },
      };
    },

    methods: {
      searchSchedule() {
        var _this = this;
        var dataToPost = {
          startDate: new Date(this.formItem.date[0]).toDateString(),
          endDate: new Date(this.formItem.date[1]).toDateString(),
          hallId: this.formItem.selectHall,
          movieId: this.formItem.selectMovie
        };
        console.log("获取排片所需信息", dataToPost);
        axios.get("GetScheduleList", {params: dataToPost})
          .then(function (response) {
            console.log(response)
            _this.scheduleList.dateRange = _this.formatEveryDay(dataToPost.startDate,dataToPost.endDate);
            console.log(_this.scheduleList.dateRange)
            _this.drawScheduleList(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      drawScheduleList(rawData) {
        var _this = this;
        var chart = echarts.init(document.getElementById("schedule-list"));
        var hours = ['12a', '1a', '2a', '3a', '4a', '5a', '6a',
          '7a', '8a', '9a', '10a', '11a',
          '12p', '1p', '2p', '3p', '4p', '5p',
          '6p', '7p', '8p', '9p', '10p', '11p'];
        var days = _this.scheduleList.dateRange;
        var data = _this.initScheduleMap(_this.scheduleList.dateRange.length,hours.length,rawData);

        //var data = [[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], [0, 5, '0'], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0], [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2], [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0], [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]];

        data = data.map(function (item) {
          return [item[1], item[0], item[2] || '-'];
        });

        var option = {
          title: {
            text: '排片管理数据',
            subtext:'电影id：'+rawData[0].movieId,
            x: 'center'
          },
          tooltip: {
            position: 'top'
          },
          animation: false,
          grid: {
            height: '50%',
            y: '10%'
          },
          xAxis: {
            type: 'category',
            data: hours,
            splitArea: {
              show: true
            }
          },
          yAxis: {
            type: 'category',
            data: days,
            splitArea: {
              show: true
            }
          },
          visualMap: {
            min: 0,
            max: 50,
            calculable: true,
            orient: 'horizontal',
            left: 'center',
            bottom: '15%'
          },
          series: [{
            name: '价格',
            type: 'heatmap',
            data: data,
            label: {
              normal: {
                show: true
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        };
        chart.setOption(option)
      },
      formatEveryDay(start, end) {
        let dateList = [];
        var startTime = this.getDate(start);
        var endTime = this.getDate(end);

        while ((endTime.getTime() - startTime.getTime()) >= 0) {
          var year = startTime.getFullYear();
          var month = startTime.getMonth() + 1 < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() + 1;
          var day = startTime.getDate().toString().length === 1 ? "0" + startTime.getDate() : startTime.getDate();
          dateList.push(year + "-" + month + "-" + day);
          startTime.setDate(startTime.getDate() + 1);
        }
        return dateList;
      },
      getDate(datestr) {
        /*var temp = datestr.split("-");
        var date = new Date(temp[0], temp[1] - 1, temp[2]);*/
        var date = new Date(datestr);
        return date;
      },
      initScheduleMap(m,n,data){
        var _this = this;
        var scheduleMap = new Array();  //先声明一维
        for(var k=0;k<m;k++) {    //一维长度为i,i为变量，可以根据实际情况改变
          scheduleMap[k] = new Array();  //声明二维，每一个一维数组里面的一个元素都是一个数组；
          for (var j = 0; j < n; j++) {   //一维数组里面每个元素数组可以包含的数量p，p也是一个变量；
            scheduleMap[k][j] = 0;    //这里将变量初始化，我这边统一初始化为空，后面在用所需的值覆盖里面的值
          }
        }
        var res = new Array();
        //scheduleMap = 0;
        console.log(scheduleMap)
        data.forEach(e =>{
          console.log("*************************************************")
          var startDatePtr = _this.scheduleList.dateRange.indexOf(e.startOnSaleDate);
          var endDatePtr = _this.scheduleList.dateRange.indexOf(e.endOnSaleDate);
          startDatePtr = startDatePtr < 0 ? 0 : startDatePtr;
          endDatePtr = endDatePtr < 0 ? _this.scheduleList.dateRange.length-1 : endDatePtr;
          var startHour = new Date(e.startTime).getHours()-8;
          var endHour = new Date(e.endTime).getHours()-8; //东八区
          for(var i=startDatePtr;i<=endDatePtr;i++){
            for(var j=startHour;j<=endHour;j++){
              scheduleMap[i][j] = e.price;
            }
          }
        })
        for(var i=0;i<m;i++){
          for(var j=0;j<n;j++){
            var tempList = [i,j,scheduleMap[i][j]];
            res.push(tempList)
          }
        }
        console.log(res)
        console.log(scheduleMap);
        return res;
      }


    },
    created() {
      var _this = this;
      axios
        .get("GetHallList")
        .then(function (response) {
          _this.hallList = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
      axios
        .get("GetMovieList")
        .then(function (response) {
          _this.MovieList = response.data;
        })
        .catch(function (error) {
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
