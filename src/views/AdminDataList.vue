<template>
  <div >
  <Card style="margin-bottom: 20px">
    <h3>所有电影想看列表</h3>
    <div class="like" :id="id" style="width:850px;height:400px" ref="chartLike"></div>
  </Card>
  <Card style="margin-bottom: 20px">
    <div class="popular"  style="width:850px;height:400px" ref="chartPopular"></div>
  </Card>


    <Card style="margin-bottom: 20px">
      <div class="custom"  style="width:850px;height:400px" ref="chartCustom"></div>
    </Card>

    <Card style="margin-bottom: 20px">
      <div class="box-office"  style="width:850px;height:400px" ref="chartBox"></div>
    </Card>
    <Card style="margin-bottom: 20px">
      <div class="attendance"  style="width:850px;height:400px" ref="chartAttendance"></div>
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
        movieName: ['复仇者联盟', '小黄人', '鬼屋欢乐颂', '惊魂一夜', '悲伤', '快乐', '你好漂亮', '黑凤凰'],
        chart: null,
        currentTime: '',
        popularMovieName: ['复仇者联盟', '小黄人', '鬼屋欢乐颂', '惊魂一夜', '悲伤', '快乐', '你好漂亮', '黑凤凰'],
        MovieBox: [],

        //前端要给后端的参数
        params: [{
          movieNameList: [],
          time: '',
        }]
      }
    },
    mounted() {
      this.initChartLike();
      this.initChartPopular();
      this.initChartCustom();
      this.initChartAttendance();
      this.initChartBox();
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
            barwidth: '10%',
            data: [100, 500, 338,578,928,483,1000,365]
          }]
        })
      },
      initChartPopular() {
        this.chart = echarts.init(this.$refs.chartPopular);
        //把配置和数据放这里
        this.chart.setOption({
          title: {
            text: '最受欢迎电影',
            subtext: '截止到当前时间的前八名',
            x: 'middle',
            y: 'top'
          },
         // color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {     //坐标轴指示器，坐标轴触发有效
              type: 'line'
            }
          },
          grid: {
            left: '3%',
            right: '3%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: this.popularMovieName,
            axisTick: {
              show: true,
            },
            axisLabel: {
              interval: 0,
              rotate: 45,
            }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '票房统计',
            type: 'bar',
            barWidth: '50%',
            data: [1500, 1350, 1100, 1000, 900, 800, 600, 400]
          }]
        })
      },
      initChartCustom(){
        this.chart = echarts.init(this.$refs.chartCustom);
        this.chart.setOption({
          title: {
            text: '客单价',
            subtext: '截止最近一周',
            x: 'middle',
            y: 'top'
          },
         // color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable:true,
          xAxis: [{
            type: 'category',
            boundaryGap : false,
            data:  ['6/1','6/2','6/3','6/4','6/5','6/6','6/7','6/8','6/9','6/10'],
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
            name: '客单价统计',
            type: 'line',
          stack:'总量',
            data: [1500, 1350, 1600, 2000, 1923, 1889, 2348, 3473]
          }]
        })
      },
      initChartAttendance() {
        this.chart = echarts.init(this.$refs.chartAttendance);
        //把配置和数据放这里
        this.chart.setOption({
          title: {
            text: '上座率',
            subtext: '上映电影上座率比较',
            x: 'middle',
          },
          tooltip: {
            trigger: 'item',
            formatter:"{a} <br/>{b} : {c} ({d}% "
          },

          legend: {
            x : 'center',
            y : 'bottom',
            data:['复仇者联盟', '小黄人', '鬼屋欢乐颂', '惊魂一夜', '悲伤', '快乐', '你好漂亮', '黑凤凰'],
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {
                show: true,
                type: [ 'funnel']
              },
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },
          calculable: true,
          series : [
            {
              name:'面积模式',
              type:'pie',
              radius : [30, 110],
              center : ['50%', 200],
              roseType : 'area',
             // x: '50%',               // for funnel
              max: 40,                // for funnel
              sort : 'ascending',     // for funnel
              data:[
                {value:10, name:'复仇者联盟'},
                {value:5, name:'小黄人'},
                {value:15, name:'鬼屋欢乐颂'},
                {value:25, name:'惊魂一夜'},
                {value:20, name:'悲伤'},
                {value:35, name:'快乐'},
                {value:30, name:'你好漂亮'},
                {value:40, name:'黑凤凰'}
              ]
        }]
      })
    },
      initChartBox() {
        this.chart = echarts.init(this.$refs.chartBox);
        //把配置和数据放这里
        this.chart.setOption({
          title: {
            text: '票房 vs 排片（box vs schedule）',
            subtext: '略',
            x: 'middle',
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            orient : 'vertical',
            x : 'right',
            y : 'bottom',
            data:['票房（box）','排片（schedule）']
          },
          toolbox: {
            show : true,
            feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
            }
          },

          polar : [
            {
              indicator : [
                { text: '复仇者联盟', max: 6000},
                { text: '小黄人', max: 16000},
                { text: '鬼屋欢乐颂', max: 30000},
                { text: '惊魂一夜', max: 38000},
                { text: '悲伤', max: 52000},
                { text: '快乐', max: 25000}
              ]
            }
          ],
          calculable: true,
          series : [
            {
              name: '票房 vs 排片（box vs schedule）',
              type: 'radar',
              data : [
                {
                  value : [4300, 10000, 28000, 35000, 50000, 19000],
                  name : '票房（box）'
                },
                {
                  value : [5000, 14000, 28000, 31000, 42000, 21000],
                  name : '排片（schedule）'
                }
              ]
            }
          ]
        })
      },
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
