<template>
  <div class="layout">
    <Layout :style="{padding: '0 20px'}">
      <Content :style="{padding: '24px ', minHeight: '280px', background: '#fff'}">
        <h1 style="text-align: left">新增影厅</h1>
        <Card style="width:400px;height:300px">
          <Form
            ref="formValidate"
            :model="formValidate"
            :rules="ruleValidate"
            :label-width="90"
            style="width: 500px"
          >
            <FormItem label="影厅名称" prop="name" style="width: 300px">
              <Input v-model="formValidate.name" placeholder></Input>
            </FormItem>
            <FormItem label="影厅特点" prop="feature" style="width: 300px">
              <Select v-model="formValidate.feature" placeholder>
                <Option value="3D">3D厅</Option>
                <Option value="IMAX">IMAX3D厅</Option>
                <Option value="VIP">VIP厅</Option>
                <Option value="couple">情侣厅</Option>
                <Option value="family">家庭厅</Option>
                <Option value="fullScreen">杜比全景声巨幕厅</Option>
              </Select>
            </FormItem>
            <FormItem label="影厅类型" prop="type" style="width: 300px">
              <Select v-model="formValidate.type" placeholder>
                <Option value="VIP">VIP厅</Option>
                <Option value="normal">普通厅</Option>
                <Option value="large">大厅</Option>
                <Option value="huge">超大厅</Option>
              </Select>
            </FormItem>
            <FormItem style="padding-left:50px;text-align: left">
              <Button type="primary" ghost style="height:30px;width: 55px" @click="addHall">确认</Button>
              <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
          </Form>
        </Card>
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

.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}

.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}

.layout-footer-center {
  text-align: center;
}
</style>

<script>
import admin from "../api/adminApi";

export default {
  name: "AdminHallAdd",
  data() {
    return {
      formValidate: {
        name: "",
        type: "",
        feature: ""
      },

      ruleValidate: {
        name: [{ required: true, message: "名称不能为空", trigger: "blur" }],
        type: [
          {
            required: true,
            type: "string",
            min: 1,
            message: "请至少选择一种",
            trigger: "change"
          }
        ],
        feature: [
          {
            required: true,
            type: "string",
            min: 1,
            message: "请至少选择一种",
            trigger: "change"
          }
        ]
      }
    };
  },

  methods: {
    judgeSize(type) {
      var retSize = 0;
      if (type === "小厅") {
        retSize = 5;
      } else if (type === "普通厅") {
        retSize = 9;
      } else if (type === "大厅") {
        retSize = 12;
      } else {
        retSize = 13;
      }
      return retSize;
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },

    addHall: function() {
      var _this = this;
      var seatList = [];
      var rows = this.judgeSize(this.formValidate.type);
      var columns = this.judgeSize(this.formValidate.type);
      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          seatList.push({
            row: i,
            column: j,
            seatAvailable: true
          });
        }
      }
      //前端要给后端的输入
      var addHallList = {
        id: 1,
        name: this.formValidate.name,
        seatList: seatList,
        feature: this.formValidate.feature
      };
      console.log(addHallList);
      admin
        .InsertHall(addHallList)
        .then(function(response) {
          _this.$Message.success("新增影厅成功！");
        })
        .catch(function(error) {
          _this.$Message.error("新增失败，请重试");
        });
    }
  }
};
</script>
