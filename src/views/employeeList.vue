<template>
  <Table :columns="columnInfo" :data="employeeList" style="margin-left: 20px">
    <template slot-scope="{ row, index }" slot="employeeName">
      <Input type="text" v-model="editName" v-if="editIndex === index"/>
      <span v-else>{{ row.employeeName }}</span>
    </template>
    <template slot-scope="{ row, index }" slot="employeeJobNumber">
      <Input type="text" v-model="editJobNumber" v-if="editIndex === index"/>
      <span v-else>{{ row.employeeJobNumber }}</span>
    </template>
    <template slot-scope="{ row, index }" slot="employeeType">
      <Input type="text" v-model="editType" v-if="editIndex === index"/>
      <span v-else>{{ row.employeeType }}</span>
    </template>
    <template slot-scope="{ row, index }" slot="actionInfo">
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
</template>

<script>
import axios from "axios";
export default {
  name: "employerList",
  data() {
    return {
      columnInfo: [
        {
          title: "员工姓名",
          slot: "employeeName"
        },
        {
          title: "员工工号",
          slot: "employeeJobNumber"
        },
        {
          title: "员工类型",
          slot: "employeeType"
        },
        {
          title: "操作",
          slot: "actionInfo"
        }
      ],
      employeeList: [
        // {
        //   employeeName:'大毛',
        //   employeeType:'售票员',
        //   employeeJobNumber:'19061301'
        // },
        // {
        //   employeeName:'二毛',
        //   employeeType:'清洁工',
        //   employeeJobNumber:'19061301'
        // },
      ],
      editIndex: -1, //当前聚焦的输入框的行数
      editName: "",
      editJobNumber: "",
      editType: ""
    };
  },
  methods: {
    handleEdit(row, index) {
      this.editType = row.employeeType;
      this.editJobNumber = row.employeeJobNumber;
      this.editName = row.employeeName;
      this.editIndex = index;
    },
    handleSave(index) {
      this.employeeList[index].employeeType = this.editType;
      this.employeeList[index].employeeName = this.editName;
      this.employeeList[index].employeeJobNumber = this.editJobNumber;
      this.editIndex = -1;
    },
    remove(index) {
      this.employeeList.splice(index, 1);
      this.editIndex = -1;
    }
  },
  created() {
    var that = this;
    axios
      .get("GetEmployee")
      .then(function(response) {
        response.data.forEach(e => {
          if (e.employeeLevel == 1) e.employeeType = "售票员"
          else e.employeeType = "清洁工"
          e.employeeJobNumber = e.jobNumber
        });
        that.employeeList = response.data;
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>

<style scoped>
</style>
