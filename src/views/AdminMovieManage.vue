<template>
  <div class="layout">
    <Layout :style="{padding: '0 20px'}">
      <Content :style="{padding: '24px ', minHeight: '280px', background: '#fff'}">
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="90"
              style="text-align: left;" inline>
          <FormItem label="电影名称" prop="name" style="width:400px">
            <Input v-model="formValidate.name"></Input>
          </FormItem>
          <FormItem label="国家/地区" prop="country" style="width: 300px">
            <Select v-model="formValidate.country">
              <Option v-for="country in countryList" :value="country.label" :key="country.label">{{ country.label }}
              </Option>
            </Select>
          </FormItem>
          <FormItem label="电影语言" prop="language" style="width: 400px">
            <Select v-model="language">
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
          <FormItem label="电影时长" prop="duration" style=" text-align: left; width: 300px">
            <Input type="number" v-model="formValidate.duration" placeholder="请输入数字">
            <span slot="append">分钟</span>
            </Input>
          </FormItem>
          <FormItem label="上映时间" style="width: 400px">
            <Row>
              <Col span="18">
              <FormItem prop="date">
                <DatePicker type="date" placeholder="选择日期" v-model="formValidate.date"></DatePicker>
              </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="电影导演" prop="nameOfDir" style="width: 300px">
            <Input v-model="formValidate.nameOfDir" placeholder="请输入导演名字"
            ></Input>
          </FormItem>
          <Form ref="addActors" :model="addActors" :label-width="90" style="width: 400px" >
            <FormItem
              v-for="(item, index) in addActors.items"
              v-if="item.status"
              :key="index"
              :label="'演员 ' + item.index"
              :prop="'items.' + index + '.valueActor'"
              :rules="{required: true, message:'不能为空', trigger: 'blur'}">
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
                <Col span="24">
                <Button type="dashed" long @click="handleAdd" icon="md-add">添加</Button>
                </Col>
              </Row>
            </FormItem>
          </Form>
          <FormItem label="上架状态" style="width: 800px;">
            <i-switch v-model="switchStatus" size="large" style="float:left; margin-top:7px">
              <span slot="open">已上</span>
              <span slot="close">未上</span>
            </i-switch>
          </FormItem>
          <FormItem label="上传海报" prop="posterUrl" style="width:400px" >
            <Input placeholder="请填入电影海报URL" v-model="formValidate.posterUrl"></Input>
          </FormItem>
          <FormItem label="影片类型" prop="type">
            <CheckboxGroup v-model="formValidate.type">
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
          <FormItem label="剧情介绍" prop="desc" style="width: 800px;">
            <Input v-model="formValidate.desc" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                   placeholder=""></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formValidate')">确认</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </Content>
    </Layout>
  </div>

</template>

<style scoped>
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

</style>

<script>
  import admin from '../api/adminApi.js'
  import Upload from "element-ui/packages/upload/src/upload";
  import axios from 'axios'

  export default {
    name: "AdminMovieManage",
    components: {Upload},
    data() {
      return {
        switchStatus: false,
        language: '',
        starring: [],

        formValidate: {
          name: '',
          type: [],
          date: '',
          desc: '',
          country: '',
          duration: 0,
          nameOfDir:'',
        },
        ruleValidate: {
          name: [
            {required: true, message: '名称不能为空', trigger: 'blur'}
          ],
          type: [
            {required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change'},
          ],
          date: [
            {required: true, type: 'date', message: '请选择上映时间', trigger: 'change'}
          ],
          desc: [
            {required: true, message: '请输入一段介绍', trigger: 'blur'},
            {type: 'string', min: 20, message: '介绍不得少于20字', trigger: 'blur'}
          ]
        },
        index: 1,
        addActors: {
          items: [
            {
              valueActor: '',
              index: 1,
              status: 1
            }
          ]
        },
        countryList: [
          {value: "AO", label: "安哥拉"},
          {value: "AF", label: "阿富汗"},
          {value: "AL", label: "阿尔巴尼亚"},
          {value: "DZ", label: "阿尔及利亚"},
          {value: "AD", label: "安道尔共和国"},
          {value: "AI", label: "安圭拉岛"},
          {value: "AG", label: "安提瓜和巴布达"},
          {value: "AR", label: "阿根廷"},
          {value: "AM", label: "亚美尼亚"},
          {value: "AU", label: "澳大利亚"},
          {value: "AT", label: "奥地利"},
          {value: "AZ", label: "阿塞拜疆"},
          {value: "BS", label: "巴哈马"},
          {value: "BH", label: "巴林"},
          {value: "BD", label: "孟加拉国"},
          {value: "BB", label: "巴巴多斯"},
          {value: "BY", label: "白俄罗斯"},
          {value: "BE", label: "比利时"},
          {value: "BZ", label: "伯利兹"},
          {value: "BJ", label: "贝宁"},
          {value: "BM", label: "百慕大群岛"},
          {value: "BO", label: "玻利维亚"},
          {value: "BW", label: "博茨瓦纳"},
          {value: "BR", label: "巴西"},
          {value: "BN", label: "文莱"},
          {value: "BG", label: "保加利亚"},
          {value: "BF", label: "布基纳法索"},
          {value: "MM", label: "缅甸"},
          {value: "BI", label: "布隆迪"},
          {value: "CM", label: "喀麦隆"},
          {value: "CA", label: "加拿大"},
          {value: "CF", label: "中非共和国"},
          {value: "TD", label: "乍得"},
          {value: "CL", label: "智利"},
          {value: "CN", label: "中国"},
          {value: "CO", label: "哥伦比亚"},
          {value: "CG", label: "刚果"},
          {value: "CK", label: "库克群岛"},
          {value: "CR", label: "哥斯达黎加"},
          {value: "CU", label: "古巴"},
          {value: "CY", label: "塞浦路斯"},
          {value: "CZ", label: "捷克"},
          {value: "DK", label: "丹麦"},
          {value: "DJ", label: "吉布提"},
          {value: "DO", label: "多米尼加共和国"},
          {value: "EC", label: "厄瓜多尔"},
          {value: "EG", label: "埃及"},
          {value: "SV", label: "萨尔瓦多"},
          {value: "EE", label: "爱沙尼亚"},
          {value: "ET", label: "埃塞俄比亚"},
          {value: "FJ", label: "斐济"},
          {value: "FI", label: "芬兰"},
          {value: "FR", label: "法国"},
          {value: "GF", label: "法属圭亚那"},
          {value: "GA", label: "加蓬"},
          {value: "GM", label: "冈比亚"},
          {value: "GE", label: "格鲁吉亚"},
          {value: "DE", label: "德国"},
          {value: "GH", label: "加纳"},
          {value: "GI", label: "直布罗陀"},
          {value: "GR", label: "希腊"},
          {value: "GD", label: "格林纳达"},
          {value: "GU", label: "关岛"},
          {value: "GT", label: "危地马拉"},
          {value: "GN", label: "几内亚"},
          {value: "GY", label: "圭亚那"},
          {value: "HT", label: "海地"},
          {value: "HN", label: "洪都拉斯"},
          {value: "HK", label: "香港"},
          {value: "HU", label: "匈牙利"},
          {value: "IS", label: "冰岛"},
          {value: "IN", label: "印度"},
          {value: "ID", label: "印度尼西亚"},
          {value: "IR", label: "伊朗"},
          {value: "IQ", label: "伊拉克"},
          {value: "IE", label: "爱尔兰"},
          {value: "IL", label: "以色列"},
          {value: "IT", label: "意大利"},
          {value: "JM", label: "牙买加"},
          {value: "JP", label: "日本"},
          {value: "JO", label: "约旦"},
          {value: "KH", label: "柬埔寨"},
          {value: "KZ", label: "哈萨克斯坦"},
          {value: "KE", label: "肯尼亚"},
          {value: "KR", label: "韩国"},
          {value: "KW", label: "科威特"},
          {value: "KG", label: "吉尔吉斯坦"},
          {value: "LA", label: "老挝"},
          {value: "LV", label: "拉脱维亚"},
          {value: "LB", label: "黎巴嫩"},
          {value: "LS", label: "莱索托"},
          {value: "LR", label: "利比里亚"},
          {value: "LY", label: "利比亚"},
          {value: "LI", label: "列支敦士登"},
          {value: "LT", label: "立陶宛"},
          {value: "LU", label: "卢森堡"},
          {value: "MG", label: "马达加斯加"},
          {value: "MW", label: "马拉维"},
          {value: "MY", label: "马来西亚"},
          {value: "MV", label: "马尔代夫"},
          {value: "ML", label: "马里"},
          {value: "MT", label: "马耳他"},
          {value: "MU", label: "毛里求斯"},
          {value: "MX", label: "墨西哥"},
          {value: "MD", label: "摩尔多瓦"},
          {value: "MC", label: "摩纳哥"},
          {value: "MN", label: "蒙古"},
          {value: "MS", label: "蒙特塞拉特岛"},
          {value: "MA", label: "摩洛哥"},
          {value: "MZ", label: "莫桑比克"},
          {value: "NA", label: "纳米比亚"},
          {value: "NR", label: "瑙鲁"},
          {value: "NP", label: "尼泊尔"},
          {value: "NL", label: "荷兰"},
          {value: "NZ", label: "新西兰"},
          {value: "NI", label: "尼加拉瓜"},
          {value: "NE", label: "尼日尔"},
          {value: "NG", label: "尼日利亚"},
          {value: "KP", label: "朝鲜"},
          {value: "NO", label: "挪威"},
          {value: "OM", label: "阿曼"},
          {value: "PK", label: "巴基斯坦"},
          {value: "PA", label: "巴拿马"},
          {value: "PG", label: "巴布亚新几内亚"},
          {value: "PY", label: "巴拉圭"},
          {value: "PE", label: "秘鲁"},
          {value: "PH", label: "菲律宾"},
          {value: "PL", label: "波兰"},
          {value: "PF", label: "法属玻利尼西亚"},
          {value: "PT", label: "葡萄牙"},
          {value: "PR", label: "波多黎各"},
          {value: "QA", label: "卡塔尔"},
          {value: "RO", label: "罗马尼亚"},
          {value: "RU", label: "俄罗斯"},
          {value: "LC", label: "圣卢西亚"},
          {value: "VC", label: "圣文森特岛"},
          {value: "SM", label: "圣马力诺"},
          {value: "ST", label: "圣多美和普林西比"},
          {value: "SA", label: "沙特阿拉伯"},
          {value: "SN", label: "塞内加尔"},
          {value: "SC", label: "塞舌尔"},
          {value: "SL", label: "塞拉利昂"},
          {value: "SG", label: "新加坡"},
          {value: "SK", label: "斯洛伐克"},
          {value: "SI", label: "斯洛文尼亚"},
          {value: "SB", label: "所罗门群岛"},
          {value: "SO", label: "索马里"},
          {value: "ZA", label: "南非"},
          {value: "ES", label: "西班牙"},
          {value: "LK", label: "斯里兰卡"},
          {value: "SD", label: "苏丹"},
          {value: "SR", label: "苏里南"},
          {value: "SZ", label: "斯威士兰"},
          {value: "SE", label: "瑞典"},
          {value: "CH", label: "瑞士"},
          {value: "SY", label: "叙利亚"},
          {value: "TW", label: "台湾省"},
          {value: "TJ", label: "塔吉克斯坦"},
          {value: "TZ", label: "坦桑尼亚"},
          {value: "TH", label: "泰国"},
          {value: "TG", label: "多哥"},
          {value: "TO", label: "汤加"},
          {value: "TT", label: "特立尼达和多巴哥"},
          {value: "TN", label: "突尼斯"},
          {value: "TR", label: "土耳其"},
          {value: "TM", label: "土库曼斯坦"},
          {value: "UG", label: "乌干达"},
          {value: "UA", label: "乌克兰"},
          {value: "AE", label: "阿拉伯联合酋长国"},
          {value: "GB", label: "英国"},
          {value: "US", label: "美国"},
          {value: "UY", label: "乌拉圭"},
          {value: "UZ", label: "乌兹别克斯坦"},
          {value: "VE", label: "委内瑞拉"},
          {value: "VN", label: "越南"},
          {value: "YE", label: "也门"},
          {value: "YU", label: "南斯拉夫"},
          {value: "ZW", label: "津巴布韦"},
          {value: "ZR", label: "扎伊尔"},
          {value: "ZM", label: "赞比亚"}
        ],
        /*
        //尝试用图床上传海报
          picInfo: {
          code:"success",
          msg:"",     //如果成功则为空，失败就有错误信息了
          width: 1157,
          height: 680,
          filename: "image_2015-08-26_10-54-48.png",
          storename: "56249afa4e48b.png",
          size: 69525,
          path: "/2015/10/19/56249afa4e48b.png",
          hash: "nLbCw63NheaiJp1",
          timestamp: 1445239546,
          url: "https://ooo.0o0.ooo/2015/10/19/56249afa4e48b.png",
          delete: "https://sm.ms/api/delete/nLbCw63NheaiJp1"
        }

         */

      }
    },
    methods: {
      handleSubmit(name) {
        var _this = this;
        this.$refs[name].validate((valid) => {
          if (valid) {
            _this.movieAdd()
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name) {
        this.$refs[name].resetFields();
      },
      handleAdd() {
        this.index++;
        this.addActors.items.push({
          valueActor: '',
          index: this.index,
          status: 1
        });
      },
      handleRemove(index) {
        this.addActors.items[index].status = 0;
      },

      /*
      getImg() {
        /* 需要注意的是在ajax中使用formdata需要配置anync:true,contentType:false,processData:false,
        在axios中不配置也能上传
        还有一个地方需要注意的是formData.append(name,value),里面的name对应的是input 的name值，
        value对应的是input的files[0]，不是input.val(),对于的type=file的input，
        图片是在input的FileList里面，
        这里用的是this.$refs.upload.files[0]，
        这是因为在vue中使用this.$refs.refname来获取dom的真实节点，
        用jq或者js的获取节点的方法是拿不到的，
        var _this = this;
        var formData = new FormData();
        formData.append('file', this.$refs.upload.files[0]);
        axios({
          method: 'post',
          url: 'https://sm.ms/api/upload',
          anync: true,
          contentType: false,
          processData: false,
          data: formData
        }).then(function (res) {
          console.log(res)
          _this.picInfo = res
        })
      },
  */

      //写接口了！
      movieAdd: function () {
        var _this = this;
        for (var i = 0; i < this.addActors.items.length; i++) {
          this.starring.push(this.addActors.items[i].valueActor)
        }

       var movieAddList = {
          name: this.formValidate.name,
          country: this.formValidate.country,
          language: this.language,
          description: this.formValidate.desc,
          duration: this.formValidate.duration,
          posterUrl: this.formValidate.posterUrl,
          director: this.formValidate.nameOfDir,
          starringList: this.starring,
          movieTypeList: [],
          startDate: this.formValidate.date,
          status: this.switchStatus?1:0,
        };
        for(var i=0; i<this.formValidate.type.length;i++){
          movieAddList.movieTypeList.push(this.formValidate.type[i])
        }
        console.log(movieAddList);
        admin.InsertMovie(movieAddList)
          .then(res => {
            _this.$Message.success("新增电影成功！");
          })
          .catch(err => {
            _this.$Message.error("新增失败，请重试")
          });
      },

    }
  }
</script>

