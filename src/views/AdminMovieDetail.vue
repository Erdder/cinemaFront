<template>
  <div>
    <Card style="width:1000px; margin-bottom: 20px">
      <p slot="title" style="text-align: left">电影详情</p>
      <div>
        <p slot="title" style="text-align: left; height: 25px">
          <Icon type="ios-film-outline"></Icon>
          {{movieDetail.name}}
          <Tag :color="statusColor(movieDetail.status)">{{statusParser(movieDetail.status)}}</Tag>
        </p>
        <div
          style="text-align:left;float: left; width: 100px;height: 130px; margin-right: 5px; margin-top: 5px"
        >
          <img style="width: 100px;height: 130px;" :src="movieDetail.posterUrl">
        </div>
        <div style="width: 750px; text-align: justify;margin-top: 5px">
          <p>
            <strong>简介：</strong>
            {{movieDetail.description}}
          </p>
          <Button style="margin-top: 40px" type="primary" @click="editMovie">修改</Button>
          <Button style="margin-top: 40px" type="error" @click="deleteMovie">删除</Button>
          <p>
            <strong>时长：</strong>
            {{movieDetail.duration}}
          </p>
          <p>
            <strong>上映时间：</strong>
            {{movieDetail.startDate}}
          </p>
          <p>
            <strong>国家/地区：</strong>
            {{movieDetail.country}}
          </p>
          <p>
            <strong>语言：</strong>
            {{movieDetail.language}}
          </p>
          <p>
            <strong>类型：</strong>
            {{movieDetail.type.toString().replace(/,/g,'/')}}
          </p>
          <p>
            <strong>导演：</strong>
            {{movieDetail.director}}
          </p>
          <p>
            <strong>主演：</strong>
            {{movieDetail.starring.toString().replace(/,/g,'/')}}
          </p>
        </div>
      </div>
    </Card>
    <Card>
      <div ref="movieLike" style="width: 850px;height: 400px"></div>
    </Card>
    <Modal v-model="editMovieVisible" title="修改电影" @on-ok="updateMovie" @on-cancel>
      <Form v-model="movieDetail" :rules="ruleValidate" :label-width="70" style="width: 500px">
        <FormItem label="电影名称" style="width: 300px">
          <Input v-model="movieDetail.name"></Input>
        </FormItem>
        <FormItem label="国家/地区" style="width: 250px">
          <Select v-model="movieDetail.country" style="width: 230px">
            <Option
              v-for="country in countryList"
              :value="country.label"
              :key="country.label"
            >{{ country.label }}</Option>
          </Select>
        </FormItem>
        <FormItem label="电影语言" style="width: 300px">
          <Select v-model="movieDetail.language">
            <Option value="简体中文">简体中文</Option>
            <Option value="英语">英语</Option>
            <Option value="德语">德语</Option>
            <Option value="法语">法语</Option>
            <Option value="阿拉伯语">阿拉伯语</Option>
            <Option value="西班牙语">西班牙语</Option>
            <Option value="日语">日语</Option>
            <Option value="韩语">韩语(朝鲜语)</Option>
            <Option value="葡萄牙语">葡萄牙语</Option>
            <Option value="俄语">俄语</Option>
          </Select>
        </FormItem>
        <FormItem label="电影时长" style="width: 300px; text-align: left">
          <Input type="number" v-model="movieDetail.duration" placeholder="请输入数字">
            <span slot="append">分钟</span>
          </Input>
        </FormItem>
        <FormItem label="上映时间" style="width: 600px">
          <Row>
            <Col span="5">
              <FormItem>
                <DatePicker type="date" placeholder="选择日期" v-model="movieDetail.startDate"></DatePicker>
              </FormItem>
            </Col>
          </Row>
        </FormItem>
        <FormItem label="电影导演" style="width: 300px">
          <Input v-model="movieDetail.director" placeholder="请输入导演名字"></Input>
        </FormItem>
        <Form ref="addActors" :model="addActors" :label-width="70" style="width: 300px">
          <FormItem
            v-for="(item, index) in addActors.items"
            :key="index"
            :label="'演员 ' + item.index"
            :prop="'items.' + index + '.valueActor'"
            :rules="{required: true, message:'不能为空', trigger: 'blur'}"
          >
            <Row>
              <Col span="18">
                <Input type="text" v-model="item.valueActor" placeholder="请输入演员名字"></Input>
              </Col>
              <Col span="4" offset="1">
                <Button @click="handleRemove(index)">删除</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="添加演员">
            <Row>
              <Col span="12">
                <Button type="dashed" long @click="handleAdd" icon="md-add">添加</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
        <FormItem label="上架状态">
          <i-switch v-model="switchStatus" size="large" style="float:left; margin-top:7px">
            <span slot="open">已上</span>
            <span slot="close">未上</span>
          </i-switch>
        </FormItem>
        <FormItem label="影片类型">
          <CheckboxGroup v-model="movieDetail.type">
            <Checkbox label="喜剧"></Checkbox>
            <Checkbox label="爱情"></Checkbox>
            <Checkbox label="动作"></Checkbox>
            <Checkbox label="枪战"></Checkbox>
            <Checkbox label="犯罪"></Checkbox>
            <Checkbox label="惊悚"></Checkbox>
            <Checkbox label="恐怖"></Checkbox>
            <Checkbox label="悬疑"></Checkbox>
            <Checkbox label="动画"></Checkbox>
            <Checkbox label="家庭"></Checkbox>
            <Checkbox label="剧情"></Checkbox>
            <Checkbox label="奇幻"></Checkbox>
            <Checkbox label="魔幻"></Checkbox>
            <Checkbox label="科幻"></Checkbox>
            <Checkbox label="战争"></Checkbox>
            <Checkbox label="青春"></Checkbox>
            <Checkbox label="伦理"></Checkbox>
            <Checkbox label="传记"></Checkbox>
            <Checkbox label="歌舞"></Checkbox>
            <Checkbox label="其他"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="剧情介绍">
          <Input
            v-model="movieDetail.description"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder
          ></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import adminApi from "../api/adminApi.js";
import axios from "axios";
import echarts from "echarts";

export default {
  name: "AdminMovieDetail",
  created() {
    console.log(this.movieDetail);
    this.movieDetail = JSON.parse(localStorage.getItem("movieDetail"));
  },
  mounted() {
    this.initChart();
  },
  data() {
    return {
      movieDetail: {
        id: "1",
        name: "夏目友人帐",
        description:
          "在人与妖怪之间过着忙碌日子的夏目，偶然与以前的同学结城重逢，由此回忆起了被妖怪缠身的苦涩记忆。此时，夏目认识了在归还名字的妖怪记忆中出现的女性·津村容莉枝。和玲子相识的她，现在和独子椋雄一同过着平稳的生活。夏目通过与他们的交流，心境也变得平和。但这对母子居住的城镇，却似乎潜伏着神秘的妖怪。在调查此事归来后，寄生于猫咪老师身体的“妖之种”，在藤原家的庭院中，一夜之间就长成树结出果实。而吃掉了与自己形状相似果实的猫咪老师，竟然分裂成了3个",
        posterUrl: "../../static/logo.png",
        director: "大森贵弘",
        starring: ["神谷浩史", "井上和彦", "高良健吾", "小林沙苗"],
        type: ["动画"],
        country: "日本",
        language: "日语",
        startDate: "2019/4/4",
        duration: "90",
        status: 1
      },
      chart: null,
      formValidate: {
        name: "",
        ID: "",
        switch: true,
        type: [],
        date: "",
        desc: "",
        country: "",
        model1: "",
        duration: 0
      },
      ruleValidate: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        nameOfDir: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        nameOfScri: [
          { required: true, message: "名称不能为空", trigger: "blur" }
        ],
        ID: [
          { required: true, message: "ID不能为空", trigger: "blur" },
          { type: "email", message: "格式不正确", trigger: "blur" }
        ],
        type: [
          {
            required: true,
            type: "array",
            min: 1,
            message: "Choose at least one hobby",
            trigger: "change"
          }
        ],
        date: [
          {
            required: true,
            type: "date",
            message: "请选择上映时间",
            trigger: "change"
          }
        ],
        desc: [
          { required: true, message: "请输入一段介绍", trigger: "blur" },
          {
            type: "string",
            min: 20,
            message: "介绍不得少于20字",
            trigger: "blur"
          }
        ]
      },
      countryList: [
        { value: "AO", label: "安哥拉" },
        { value: "AF", label: "阿富汗" },
        { value: "AL", label: "阿尔巴尼亚" },
        { value: "DZ", label: "阿尔及利亚" },
        { value: "AD", label: "安道尔共和国" },
        { value: "AI", label: "安圭拉岛" },
        { value: "AG", label: "安提瓜和巴布达" },
        { value: "AR", label: "阿根廷" },
        { value: "AM", label: "亚美尼亚" },
        { value: "AU", label: "澳大利亚" },
        { value: "AT", label: "奥地利" },
        { value: "AZ", label: "阿塞拜疆" },
        { value: "BS", label: "巴哈马" },
        { value: "BH", label: "巴林" },
        { value: "BD", label: "孟加拉国" },
        { value: "BB", label: "巴巴多斯" },
        { value: "BY", label: "白俄罗斯" },
        { value: "BE", label: "比利时" },
        { value: "BZ", label: "伯利兹" },
        { value: "BJ", label: "贝宁" },
        { value: "BM", label: "百慕大群岛" },
        { value: "BO", label: "玻利维亚" },
        { value: "BW", label: "博茨瓦纳" },
        { value: "BR", label: "巴西" },
        { value: "BN", label: "文莱" },
        { value: "BG", label: "保加利亚" },
        { value: "BF", label: "布基纳法索" },
        { value: "MM", label: "缅甸" },
        { value: "BI", label: "布隆迪" },
        { value: "CM", label: "喀麦隆" },
        { value: "CA", label: "加拿大" },
        { value: "CF", label: "中非共和国" },
        { value: "TD", label: "乍得" },
        { value: "CL", label: "智利" },
        { value: "CN", label: "中国" },
        { value: "CO", label: "哥伦比亚" },
        { value: "CG", label: "刚果" },
        { value: "CK", label: "库克群岛" },
        { value: "CR", label: "哥斯达黎加" },
        { value: "CU", label: "古巴" },
        { value: "CY", label: "塞浦路斯" },
        { value: "CZ", label: "捷克" },
        { value: "DK", label: "丹麦" },
        { value: "DJ", label: "吉布提" },
        { value: "DO", label: "多米尼加共和国" },
        { value: "EC", label: "厄瓜多尔" },
        { value: "EG", label: "埃及" },
        { value: "SV", label: "萨尔瓦多" },
        { value: "EE", label: "爱沙尼亚" },
        { value: "ET", label: "埃塞俄比亚" },
        { value: "FJ", label: "斐济" },
        { value: "FI", label: "芬兰" },
        { value: "FR", label: "法国" },
        { value: "GF", label: "法属圭亚那" },
        { value: "GA", label: "加蓬" },
        { value: "GM", label: "冈比亚" },
        { value: "GE", label: "格鲁吉亚" },
        { value: "DE", label: "德国" },
        { value: "GH", label: "加纳" },
        { value: "GI", label: "直布罗陀" },
        { value: "GR", label: "希腊" },
        { value: "GD", label: "格林纳达" },
        { value: "GU", label: "关岛" },
        { value: "GT", label: "危地马拉" },
        { value: "GN", label: "几内亚" },
        { value: "GY", label: "圭亚那" },
        { value: "HT", label: "海地" },
        { value: "HN", label: "洪都拉斯" },
        { value: "HK", label: "香港" },
        { value: "HU", label: "匈牙利" },
        { value: "IS", label: "冰岛" },
        { value: "IN", label: "印度" },
        { value: "ID", label: "印度尼西亚" },
        { value: "IR", label: "伊朗" },
        { value: "IQ", label: "伊拉克" },
        { value: "IE", label: "爱尔兰" },
        { value: "IL", label: "以色列" },
        { value: "IT", label: "意大利" },
        { value: "JM", label: "牙买加" },
        { value: "JP", label: "日本" },
        { value: "JO", label: "约旦" },
        { value: "KH", label: "柬埔寨" },
        { value: "KZ", label: "哈萨克斯坦" },
        { value: "KE", label: "肯尼亚" },
        { value: "KR", label: "韩国" },
        { value: "KW", label: "科威特" },
        { value: "KG", label: "吉尔吉斯坦" },
        { value: "LA", label: "老挝" },
        { value: "LV", label: "拉脱维亚" },
        { value: "LB", label: "黎巴嫩" },
        { value: "LS", label: "莱索托" },
        { value: "LR", label: "利比里亚" },
        { value: "LY", label: "利比亚" },
        { value: "LI", label: "列支敦士登" },
        { value: "LT", label: "立陶宛" },
        { value: "LU", label: "卢森堡" },
        { value: "MO", label: "澳门" },
        { value: "MG", label: "马达加斯加" },
        { value: "MW", label: "马拉维" },
        { value: "MY", label: "马来西亚" },
        { value: "MV", label: "马尔代夫" },
        { value: "ML", label: "马里" },
        { value: "MT", label: "马耳他" },
        { value: "MU", label: "毛里求斯" },
        { value: "MX", label: "墨西哥" },
        { value: "MD", label: "摩尔多瓦" },
        { value: "MC", label: "摩纳哥" },
        { value: "MN", label: "蒙古" },
        { value: "MS", label: "蒙特塞拉特岛" },
        { value: "MA", label: "摩洛哥" },
        { value: "MZ", label: "莫桑比克" },
        { value: "NA", label: "纳米比亚" },
        { value: "NR", label: "瑙鲁" },
        { value: "NP", label: "尼泊尔" },
        { value: "NL", label: "荷兰" },
        { value: "NZ", label: "新西兰" },
        { value: "NI", label: "尼加拉瓜" },
        { value: "NE", label: "尼日尔" },
        { value: "NG", label: "尼日利亚" },
        { value: "KP", label: "朝鲜" },
        { value: "NO", label: "挪威" },
        { value: "OM", label: "阿曼" },
        { value: "PK", label: "巴基斯坦" },
        { value: "PA", label: "巴拿马" },
        { value: "PG", label: "巴布亚新几内亚" },
        { value: "PY", label: "巴拉圭" },
        { value: "PE", label: "秘鲁" },
        { value: "PH", label: "菲律宾" },
        { value: "PL", label: "波兰" },
        { value: "PF", label: "法属玻利尼西亚" },
        { value: "PT", label: "葡萄牙" },
        { value: "PR", label: "波多黎各" },
        { value: "QA", label: "卡塔尔" },
        { value: "RO", label: "罗马尼亚" },
        { value: "RU", label: "俄罗斯" },
        { value: "LC", label: "圣卢西亚" },
        { value: "VC", label: "圣文森特岛" },
        { value: "SM", label: "圣马力诺" },
        { value: "ST", label: "圣多美和普林西比" },
        { value: "SA", label: "沙特阿拉伯" },
        { value: "SN", label: "塞内加尔" },
        { value: "SC", label: "塞舌尔" },
        { value: "SL", label: "塞拉利昂" },
        { value: "SG", label: "新加坡" },
        { value: "SK", label: "斯洛伐克" },
        { value: "SI", label: "斯洛文尼亚" },
        { value: "SB", label: "所罗门群岛" },
        { value: "SO", label: "索马里" },
        { value: "ZA", label: "南非" },
        { value: "ES", label: "西班牙" },
        { value: "LK", label: "斯里兰卡" },
        { value: "SD", label: "苏丹" },
        { value: "SR", label: "苏里南" },
        { value: "SZ", label: "斯威士兰" },
        { value: "SE", label: "瑞典" },
        { value: "CH", label: "瑞士" },
        { value: "SY", label: "叙利亚" },
        { value: "TW", label: "台湾省" },
        { value: "TJ", label: "塔吉克斯坦" },
        { value: "TZ", label: "坦桑尼亚" },
        { value: "TH", label: "泰国" },
        { value: "TG", label: "多哥" },
        { value: "TO", label: "汤加" },
        { value: "TT", label: "特立尼达和多巴哥" },
        { value: "TN", label: "突尼斯" },
        { value: "TR", label: "土耳其" },
        { value: "TM", label: "土库曼斯坦" },
        { value: "UG", label: "乌干达" },
        { value: "UA", label: "乌克兰" },
        { value: "AE", label: "阿拉伯联合酋长国" },
        { value: "GB", label: "英国" },
        { value: "US", label: "美国" },
        { value: "UY", label: "乌拉圭" },
        { value: "UZ", label: "乌兹别克斯坦" },
        { value: "VE", label: "委内瑞拉" },
        { value: "VN", label: "越南" },
        { value: "YE", label: "也门" },
        { value: "YU", label: "南斯拉夫" },
        { value: "ZW", label: "津巴布韦" },
        { value: "ZR", label: "扎伊尔" },
        { value: "ZM", label: "赞比亚" }
      ],
      addActors: {
        items: [
          /*{
                valueActor: '',
                index: 1,
              }*/
        ]
      },
      switchStatus: false,
      editMovieVisible: false,
      index: 1
    };
  },
  methods: {
    statusParser(status) {
      if (status === 1) {
        return "热映中";
      } else {
        return "已下架";
      }
    },
    statusColor: function(status) {
      return status === 1 ? "success" : "error";
    },
    initChart() {
      this.chart = echarts.init(this.$refs.movieLike);
      var data = {
        movieId: this.movieDetail.id
      };
      axios
        .post("http://172.28.193.125:8080/GetMovieLikeDetail", data)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          console.log(error);
        });
      var option = {
        title: {
          text: "想看人数变化统计",
          subtext: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["想看人数"]
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            magicType: { show: true, type: ["line", "bar"] },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value} "
            }
          }
        ],
        series: [
          {
            name: "想看人数",
            type: "line",
            data: [11, 11, 15, 13, 12, 13, 10],
            markPoint: {
              data: [
                { type: "max", name: "最大值" },
                { type: "min", name: "最小值" }
              ]
            },
            markLine: {
              data: [{ type: "average", name: "平均值" }]
            }
          }
        ]
      };
      this.chart.setOption(option);
    },
    editMovie() {
      var _this = this;
      this.addActors.items = [];
      this.index = 1;
      this.movieDetail.starring.forEach(function(actor) {
        _this.addActors.items.push({
          index: _this.index,
          valueActor: actor
        });
        _this.index++;
      });
      this.switchStatus = this.movieDetail.status === 1;
      this.editMovieVisible = true;
    },
    deleteMovie() {
      let that = this;
      axios
        .get("DeleteMovie?id=" + this.movieDetail.id)
        .then(function(response) {
          console.log(response);
          that.$Message.info("删除成功");
        })
        .catch(function(response) {
          console.error(response);
        });
    },
    updateMovie() {
      var _this = this;
      this.movieDetail.starring = [];
      this.addActors.items.forEach(function(actor) {
        _this.movieDetail.starring.push(actor.valueActor);
      });
      this.movieDetail.status = this.switchStatus === true ? 1 : 0;
      axios
        .post("UpdateMovie", this.movieDetail)
        .then(function(response) {
          this.$message.info("修改成功！");
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    handleAdd() {
      this.addActors.items.push({
        valueActor: "",
        index: this.index
      });
      this.index++;
    },
    handleRemove(index) {
      this.addActors.items.splice(index, 1);
      this.index--;
    }
  }
};
</script>

<style scoped></style>
