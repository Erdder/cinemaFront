<template>
  <div class="lay-out">
    <Layout :style="{padding: '0 20px'}">
      <Content :style="{padding: '24px ', minHeight: '280px', background: '#fff'}">
        <div v-for="movie in movieList" :key="movie">
          <Card style="height: 220px; margin-bottom: 10px">
            <p slot="title" style="text-align: left; height: 25px">
              <Icon type="ios-film-outline"></Icon>
              {{movie.name}}
              <Tag :color=statusColor(movie.status)>{{statusParser(movie.status)}}</Tag>
            </p>
            <Button type="primary" @click="renderMovieDetail(movie.id)" slot="extra">
              详情
            </Button>
            <div style="text-align:left;float: left; width: 100px;height: 130px; margin-right: 5px">
              <img style="width: 100px;height: 130px;" :src=movie.posterUrl>
            </div>
            <div style="width: 750px; text-align: justify;">
              <p>{{descriptionCutter(movie.description)}}</p>
              <p><strong>类型：</strong>{{movie.type.toString().replace(/,/g,'/')}}</p>
              <p><strong>导演：</strong>{{movie.director}}</p>
              <p><strong>主演：</strong>{{movie.starring.toString().replace(/,/g,'/')}}</p>
            </div>
          </Card>
        </div>
      </Content>
    </Layout>
  </div>
</template>

<script>
  import adminApi from '../api/adminApi'

  export default {
    name: "AdminMovieList",
    data() {
      return {
        movieList: [
          {
            id: '1',
            name: 'X战警：黑凤凰',
            description: '在一次危及生命的太空营救行动中，琴·葛蕾（苏菲·特纳 饰）被神秘的宇宙力量击中，成为最强大的变种人。此后琴不仅要设法掌控日益增长、极不稳定的力量，更要与自己内心的恶魔抗争，她的失控让整个X战警大家庭分崩离析，也让整个星球陷入毁灭的威胁之中……',
            posterUrl: '../../static/Xman.jpg',
            director: '西蒙·金伯格',
            //杰西卡·查斯坦,尼古拉斯·霍尔特,亚历桑德拉·希普,泰伊·谢里丹,柯蒂·斯密特-麦菲,拉马尔·约翰逊
            starring: ['苏菲·特纳', '詹姆斯·麦卡沃伊', '迈克尔·法斯宾德', '詹妮弗·劳伦斯'],
            type: ['科幻','惊悚'],
            country: '美国',
            language: '英语',
            startDate: ' 2019-06-06',
            duration: '90',
            status: 1
          },
          {
            id: '2',
            name: 'X战警：黑凤凰',
            description: '在一次危及生命的太空营救行动中，琴·葛蕾（苏菲·特纳 饰）被神秘的宇宙力量击中，成为最强大的变种人。此后琴不仅要设法掌控日益增长、极不稳定的力量，更要与自己内心的恶魔抗争，她的失控让整个X战警大家庭分崩离析，也让整个星球陷入毁灭的威胁之中……',
            posterUrl: '../../static/Xman.jpg',
            director: '西蒙·金伯格',
            //杰西卡·查斯坦,尼古拉斯·霍尔特,亚历桑德拉·希普,泰伊·谢里丹,柯蒂·斯密特-麦菲,拉马尔·约翰逊
            starring: ['苏菲·特纳', '詹姆斯·麦卡沃伊', '迈克尔·法斯宾德', '詹妮弗·劳伦斯'],
            type: ['科幻','惊悚'],
            country: '美国',
            language: '英语',
            startDate: ' 2019-06-06',
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
      descriptionCutter:function (des) {
        return des.length>160?des.slice(0,160)+'......':des;
      },
      renderMovieDetail:function (movieId) {
        localStorage.setItem("movieDetail",JSON.stringify(this.movieList[movieId]));
        this.$router.push({path:'AdminMovieDetail'})
      }
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
  }
</script>

<style scoped>

</style>
