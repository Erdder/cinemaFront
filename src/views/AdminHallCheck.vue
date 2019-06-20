<template>
  <div class="lay-out">
    <Layout :style="{padding: '0 20px'}">
      <Content :style="{padding: '24px ', minHeight: '500px', background: '#fff'}">
        <Row>
          <Col span="9">
            <h1 style="text-align: left;margin-left: 20px">基础信息</h1>
            <Table border :columns="columns" :data="baseInfo" style="margin-left: 20px">
              <template slot-scope="{ row, index }" slot="type">
                <Input type="text" v-model="editType" v-if="editIndex === index"/>
                <span v-else>{{ row.type }}</span>
              </template>
              <template slot-scope="{ row, index }" slot="seat">
                <Input type="text" v-model="editSeat" v-if="editIndex === index"/>
                <span v-else>{{ row.seat }}</span>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <div v-if="editIndex === index">
                  <Button @click="handleSave(index)">保存</Button>
                  <Button @click="editIndex = -1">取消</Button>
                  <Button @click="remove(index)">删除</Button>
                </div>
                <div v-else>
                  <Button @click="handleEdit(row, index)">编辑</Button>
                </div>
              </template>
            </Table>
          </Col>
          <Col span="12">
            <Card style="width:328px;height:280px; margin:30px 50px" dis-hover>
              <p slot="title" style="text-align: left; ">特点介绍</p>
              <Form style="text-align: left">
                <FormItem id="HallFeature">
                  <p>
                    <strong>VIP厅:</strong>人少、安静
                  </p>
                  <p>
                    <strong>3D厅:</strong>需自带3D眼镜
                  </p>
                  <p>
                    <strong>IMAX 3D厅:</strong>提供3D眼镜
                  </p>
                  <p>
                    <strong>情侣厅:</strong>享受二人世界
                  </p>
                  <p>
                    <strong>家庭厅:</strong>珍惜家人相处时光
                  </p>
                  <p>
                    <strong>杜比全景声巨幕厅:</strong>超大屏幕给您身临其境的完美体验
                  </p>
                </FormItem>
              </Form>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col>
            <h1 style="text-align: left;margin-left: 20px">详细信息</h1>
            <Table :columns="columnInfo" :data="dataInfo" style="margin-left: 20px">
              <template slot-scope="{ row, index }" slot="name">
                <Input type="text" v-model="editName" v-if="editIndexInfo === index"/>
                <span v-else>{{ row.name }}</span>
              </template>
              <template slot-scope="{ row, index }" slot="infoType">
                <Input type="text" v-model="editInfoType" v-if="editIndexInfo === index"/>
                <span v-else>{{ row.infoType }}</span>
              </template>
              <template slot-scope="{ row, index }" slot="feature">
                <Input type="text" v-model="editFeature" v-if="editIndexInfo === index"/>
                <span v-else>{{ row.feature }}</span>
              </template>
              <template slot-scope="{ row, index }" slot="actionInfo">
                <div v-if="editIndexInfo === index">
                  <Button @click="handleSaveInfo(index)">保存</Button>
                  <Button @click="editIndexInfo = -1">取消</Button>
                  <Button @click="removeInfo(index)">删除</Button>
                </div>
                <div v-else>
                  <Button @click="handleEditInfo(row, index)">编辑</Button>
                </div>
              </template>
            </Table>
          </Col>
        </Row>
      </Content>
    </Layout>
  </div>
</template>

<script>
  import adminApi from "../api/adminApi";
  import axios from "axios";

  export default {
    name: "AdminHallCheck",
    data() {
      var hallTypes;
      return {
        columns: [
          {
            title: "影厅类型",
            slot: "type",
            width: 100
          },
          {
            title: "座位数量",
            slot: "seat",
            width: 100
          },
          {
            title: "操作",
            slot: "action"
          }
        ],
        baseInfo: [
          {
            type: "小厅",
            seat: "5*5"
          },
          {
            type: "普通厅",
            seat: "9*9"
          },
          {
            type: "大厅",
            seat: "12*12"
          },
          {
            type: "超大厅",
            seat: "14*14"
          }
        ],
        editIndex: -1, //当前聚焦的输入框的行数
        editType: "",
        editSeat: "",
        editName: "",
        editFeature: "",
        editInfoType: "",
        columnInfo: [
          {
            title: "影厅名称",
            slot: "name"
          },
          {
            title: "影厅类型",
            slot: "infoType"
          },
          {
            title: "影厅特色",
            slot: "feature"
          },
          {
            title: "操作",
            slot: "actionInfo"
          }
        ],
        dataInfo: [
          {
            name: "金银宝厅",
            infoType: "小厅",
            feature: "VIP厅"
          },
          {
            name: "金铜宝厅",
            infoType: "小厅",
            feature: "VIP厅"
          }
        ],
        editIndexInfo: -1
      };
    },
    methods: {
      handleEdit(row, index) {
        this.editType = row.type;
        this.editSeat = row.seat;
        this.editIndex = index;
      },
      handleSave(index) {
        this.baseInfo[index].type = this.editType;
        this.baseInfo[index].seat = this.editSeat;
        this.editIndex = -1;
      },
      remove(index) {
        console.log(index);
        this.baseInfo.splice(index, 1);
        this.editIndex = -1;
      },

      handleEditInfo(rowInfo, indexInfo) {
        console.log(indexInfo);
        this.editInfoType = rowInfo.infoType;
        this.editName = rowInfo.name;
        this.editFeature = rowInfo.feature;
        this.editIndexInfo = indexInfo;
      },
      handleSaveInfo(index) {
        this.dataInfo[index].infoType = this.editInfoType;
        this.dataInfo[index].name = this.editName;
        this.dataInfo[index].feature = this.editFeature;
        this.editIndexInfo = -1;
        axios
          .post("UpdateHall", this.dataInfo)
          .then(function (response) {
            console.log("更新影厅列表", response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
        // TODO:格式不对
      },
      removeInfo(index) {
        console.log(index);
        let id = this.dataInfo[index].id;
        this.dataInfo.splice(index, 1);
        this.editIndexInfo = -1;
        axios
          .get("DeleteHall?id=" + id)
          .then(res => {
            console.log(res);
          })
          .catch(e => {
            console.log(e);
          });
      },
      judgeType(row, column) {
        var retType = "";
        if (row === 5) {
          retType = "小厅";
        } else if (row === 9) {
          retType = "普通厅";
        } else if (row === 12) {
          retType = "大厅";
        } else {
          retType = "超大厅";
        }
        return retType;
      }
    },
    created() {
      var _this = this;
      axios
        .get("GetHallList")
        .then(function (response) {
          console.log("获取影厅列表", response.data);
          response.data.forEach(e => {
            e.infoType = _this.judgeType(e.seatList[0], e.seatList[0]);
          });
          _this.dataInfo = response.data;
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };
</script>

<style scoped>
</style>
