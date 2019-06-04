<template>
  <div class="lay-out">
    <Layout :style="{padding: '0 20px'}">
      <Content :style="{padding: '24px ', minHeight: '280px', background: '#fff'}">
        <Row>
          <Col span="9">
            <h1 style="text-align: left">基础信息</h1>
            <Table border :columns="columns" :data="baseInfo"></Table>
            <Card style="width:328px;height:300px; margin-top: 10px" dis-hover>
              <p slot="title" style="text-align: left; ">
                特点介绍
              </p>
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"
                    style="width: 500px;text-align: left">
                <FormItem id="HallFeature">
                  <h3>VIP厅</h3>
                  <p>人少、安静</p>
                  <h3>3D厅</h3>
                  <p>需自带3D眼镜</p>
                  <h3>IMAX 3D厅</h3>
                  <p>提供3D眼镜</p>
                </FormItem>
              </Form>
            </Card>
          </Col>
          <Col span="12">
            <h1 style="text-align: left;margin-left: 40px">详细信息</h1>
            <Card style="width:400px;height:500px; margin-left: 40px" dis-hover>
              <Form ref="formValidate" :model="formValidate" :rules="ruleValidate"  style="width: 500px;text-align: left" v-for="hall in hallList" key="hall">
                <FormItem>
                  <h3>{{hall.name}}</h3>
                  <p>影厅ID: {{hall.id}}    影厅类型：{{hall.seatList[0].row}}</p>
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>
      </Content>
    </Layout>
  </div>
</template>

<script>
  import adminApi from '../api/adminApi'

  export default {
    name: "AdminHallCheck",
    data() {
      var hallTypes;
      return {
        columns: [
          {
            title: '影厅类型',
            key: 'hallType',
          },
          {
            title: '座位数量',
            key: 'size',
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            render:(h,params) => {
              return h('div',[
                h('Button', {
                  props: {
                    type: 'default' ,
                    size: 'small'
                  },
                  style:{
                    marginRight: '5px'
                  },
                  on:{
                    click: () =>{

                    }
                  }
                }, '编辑'),
                h('Button',{
                  props:{
                    type: 'default',
                    size: 'small',
                  },
                  on:{
                    click:() => {
                      this.remove(params.index)
                    }
                  }
                },'删除')
              ])
            }
          }
        ],
        baseInfo: [
          {
            hallType: '小厅',
            size: '5*5'
          },
          {
            hallType: '普通厅',
            size: '9*9'
          },
          {
            hallType: '大厅',
            size: '12*12'
          },
          {
            hallType: '超大厅',
            size: '14*14'
          },
        ],
        hallList: [{
          id: '0001',
          name: '金银财宝厅',
          seatList: [{
            row: '12',
            column: '12',
            }],
          feature: 'VIP厅',
        }],
      }
    },
    methods: {
      remove(index){
        this.baseInfo.splice(index,1)
      }
    },
    judgeType(row,column){
      var retType = '';
      if( row === 5 ){
        retType = '小厅';
      }else if( row === 9 ){
        retType = '普通厅';
      }else if ( row === 12){
        retType = '大厅';
      }else{
        retType = '超大厅';
      }
    },
    askForHallList(){
      var _this = this;
      axios.post('http://192.168.2.149:8080/GetHall')
        .then(function (response) {
          _this.hallList = response;
          for(var i =0; i < _this.hallList.length; i++){
            _this.hallList.push({
              label: _this.data[i].name,
              value: _this.data[i].id,
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    },
    created() {
      this.askForHallList();
    }
  }
</script>

<style scoped>

</style>
