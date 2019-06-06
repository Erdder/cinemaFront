<template>
  <Card style="width:1000px">
    <p slot="title" style="text-align: left">
      电影详情
    </p>
    <div v-for="movie in movieList" :key="movie">
    <p slot="title" style="text-align: left; height: 25px">
      <Icon type="ios-film-outline"></Icon>
      {{movie.name}}
      <Tag :color=statusColor(movie.status)>{{statusParser(movie.status)}}</Tag>
    </p>
    <div style="text-align:left;float: left; width: 100px;height: 130px; margin-right: 5px">
      <img style="width: 100px;height: 130px;" :src=movie.posterUrl>
    </div>
    <div style="width: 750px; text-align: justify">
      <p><strong>简介：</strong>{{movie.description}}</p>
      <p><strong>时长：</strong>{{movie.duration}}</p>
      <p><strong>上映时间：</strong>{{movie.startDate}}</p>
      <p><strong>国家/地区：</strong>{{movie.country}}</p>
      <p><strong>语言：</strong>{{movie.language}}</p>
      <p><strong>类型：</strong>{{movie.type}}</p>
      <p><strong>导演：</strong>{{movie.director}}</p>
      <p><strong>主演：</strong>{{movie.starring}}</p>
    </div>
    </div>
  </Card>
</template>

<script>
    export default {
        name: "AdminMovieDetail",
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
          ]
        }
      },
      methods: {
        statusParser(status) {
          if (status === 1) {
            return "热映中";
          } else {
            return "已下架"
          }
        },
        statusColor: function (status) {
          return status === 1 ? 'success' : 'primary';
        },

        created() {
          var _this = this;
          adminApi.GetMovieList()
            .then(res =>{
              _this.movieList = res;
            })
            .catch(err =>{
              console.log(error);
            });
        }

      },
    }
</script>

<style scoped>

</style>
