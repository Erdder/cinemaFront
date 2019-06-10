<template>
  <div>
  <Card style="margin-bottom: 20px">
    <h3>所有电影想看列表</h3>
    <div class="like" :id="id" style="width:600px;height:400px" ref="chartLike"></div>
  </Card>
  <Card style="margin-bottom: 20px">
    <h3>今日排片率</h3>
    <div style="width:600px;height:400px" ref="schedule-rate-container"></div>
  </Card>
  </div>
</template>

<script>
  import axios from "axios"
  import adminApi from '../api/adminApi.js'
  import echarts from "echarts"

  export default {
    name: "AdminDataList",
    data() {
      return {
        movieList: [
          {
            id: '1',
            name: '夏目友人帐',
            description: '在人与妖怪之间过着忙碌日子的夏目，偶然与以前的同学结城重逢，由此回忆起了被妖怪缠身的苦涩记忆。此时，夏目认识了在归还名字的妖怪记忆中出现的女性·津村容莉枝。和玲子相识的她，现在和独子椋雄一同过着平稳的生活。夏目通过与他们的交流，心境也变得平和。但这对母子居住的城镇，却似乎潜伏着神秘的妖怪。在调查此事归来后，寄生于猫咪老师身体的“妖之种”，在藤原家的庭院中，一夜之间就长成树结出果实。而吃掉了与自己形状相似果实的猫咪老师，竟然分裂成了3个',
            posterUrl: '../../static/logo.png',
            director: '大森贵弘',
            starring: '神谷浩史 /井上和彦 /高良健吾 /小林沙苗 /泽城美雪',
            type: '动画',
            country: '日本',
            language: '日语',
            startDate: '2019/4/4',
            duration: '90',
            status: 1
          },
        ],
        movieName: ['小偷家族', '大侦探默尔摩斯', '夏目友人帐'],
        chart: null,
        currentTime: '',

        //前端要给后端的参数
        params: [{
          movieNameList: [],
          time: '',
        }]
      }
    },
    mounted() {
      this.initChartLike();
    },
    beforeDestroy() {
      if (!this.chart) {
        return "yes";
      }
      this.chart.dispose();
      this.chart = null;
    },
    methods: {
      initChartLike() {
        this.chart = echarts.init(this.$refs.chartLike);
        //把配置和数据放这里
        this.chart.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {     //坐标轴指示器，坐标轴触发有效
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: this.movieName,
            axisTick: {
              alignWithLabel: true
            }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '想看人数',
            type: 'bar',
            barwidth: '20%',
            data: [10, 100, 1000]
          }]

        })
      },
      getTime() {
        setInterval(() => {
          //new Date() new一个data对象，当前日期和时间
          //toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
          this.params.time = new Date().toLocaleString();
        }, 1000)
      }
    },

    created() {
      this.getTime();
      var _this = this;
      //获取所有电影
      adminApi.GetMovieList()
        .then(res => {
          _this.movieList = res;
        })
        .catch(err => {
          console.log(err);
        });
      //获取所有电影名称
      for (var i = 0; i < _this.movieList.length(); i++) {
        _this.movieName.push({name: movieList[i].name})
      }

      adminApi.GetLikeMarkList(this.params)
        .then(res => {         //得到的是想看的数据，是一个列表
          _this.series.data = res;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
</script>

<style scoped>

</style>
