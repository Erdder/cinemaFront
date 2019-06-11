<template>
  <div  class="layout">
    <Layout>
      <Header >
        <Menu  mode="horizontal" theme="dark" active-name="1" @on-select="onSelect" style="text-align: left">
          <div class="layout-logo">
            <Avatar icon="ios-person" size="large" style="margin-bottom: 50px"/>
          </div>
          <div class="layout-nav">
            <MenuItem name="1">
              <Icon type="ios-navigate"></Icon>
              电影管理
            </MenuItem>
            <MenuItem name="2">
              <Icon type="ios-keypad"></Icon>
              排片管理
            </MenuItem>
            <MenuItem name="3">
            <Icon type="ios-analytics"></Icon>
            影厅管理
          </MenuItem>
            <MenuItem name="4">
              <Icon type="ios-paper"></Icon>
              活动管理
            </MenuItem>
              <MenuItem name="5">
                <Icon type="ios-bookmarks"></Icon>
                数据管理
              </MenuItem>
            <MenuItem name="6">
              <Icon type="ios-body"></Icon>
              员工管理
            </MenuItem>
          </div>
        </Menu>
      </Header>
      <Layout :style="{padding: '0 50px'}">
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']" @on-select="onSelect">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>
                电影管理
              </template>
              <MenuItem name="1-1">查看电影</MenuItem>
              <MenuItem name="1-2">新增电影</MenuItem>
            </Submenu>
            <Submenu name="2">
              <template slot="title">
                <Icon type="ios-keypad"></Icon>
                排片管理
              </template>
              <MenuItem name="2-1">查看排片</MenuItem>
              <MenuItem name="2-2">新增排片</MenuItem>
            </Submenu>
            <Submenu name="3">
              <template slot="title">
                <Icon type="ios-analytics"></Icon>
                影厅管理
              </template>
              <MenuItem name="3-1">查看影厅</MenuItem>
              <MenuItem name="3-2">新增影厅</MenuItem>
            </Submenu>
            <Submenu name="4">
              <template slot="title">
                <Icon type="ios-paper"></Icon>
                活动管理
              </template>
              <MenuItem name="4-1">会员卡</MenuItem>
              <MenuItem name="4-2">优惠活动</MenuItem>
              <MenuItem name="4-3">退票管理</MenuItem>
              <MenuItem name="4-4">赠送优惠券</MenuItem>
            </Submenu>
            <Submenu name="5">
              <template slot="title">
                <Icon type="ios-bookmarks"></Icon>
                数据管理
              </template>
              <MenuItem name="5-1">查看数据</MenuItem>
              <MenuItem name="5-2">先空着</MenuItem>
            </Submenu>
            <Submenu name="6">
              <template slot="title">
                <Icon type="ios-body"></Icon>
                员工管理
              </template>
              <MenuItem name="6-1">查看员工</MenuItem>
              <MenuItem name="6-2">新增员工</MenuItem>
            </Submenu>
          </Menu>
        </Sider>
        <Content>
          <router-view></router-view>
        </Content>
      </Layout>
      <Footer class="layout-footer-center">2019.6 &copy; Happy67</Footer>
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

  .layout-logo{
    width: 100px;
    height: 30px;
    //background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 10px;
    left: 100px;
  }

  .layout-nav {
    width: 750px;
    margin: 0 auto;
    margin-right: 20px;
  }


  .layout-footer-center {
    text-align: center;
  }
</style>

<script>
  export default {
    name: 'MainPage',
    methods: {
      onSelect(name) {
        switch(name) {
          case '1':
            this.$router.push({ path: '/AdminMovieList' });
            break;
          case '1-1':
            this.$router.push({ path: '/AdminMovieList' });
            break;
          case '1-2':
            this.$router.push({ path: '/AdminMovieManage' });
            break;
          case '2':
            this.$router.push({ path: '/AdminScheduleList' });
            break;
          case '2-1':
            this.$router.push({ path: '/AdminScheduleList' });
            break;
          case '2-2':
            this.$router.push({ path: '/AdminMovieSchedule' });
            break;
          case '3':
            this.$router.push({ path: '/AdminHallCheck' });
            break;
          case '3-1':
            this.$router.push({ path: '/AdminHallCheck' });
            break;
          case '3-2':
            this.$router.push({ path: '/AdminHallAdd' });
            break;
          case '4-1':
            this.$router.push({ path: '/AdminVipCard' });
            break;
          case '4-2':
            this.$router.push({ path: '/AdminCoupon' });
            break;
          case '4-3':
            this.$router.push({ path: '/AdminCoupon' });
            break;
          case '4-4':
            this.$router.push({ path: '/AdminPresentCoupon' });
            break;
          case '5-1':
            this.$router.push({ path: '/AdminDataList' });
            break;
          case '5-2':
            this.$router.push({ path: '/AdminCoupon' });
            break;
          case '6-1':
            this.$router.push({ path: '/employeeList' });
            break;
          case '6-2':
            this.$router.push({ path: '/employeeAdd' });
            break;
        }
      },
      data(){
        return{
        }
      }
    }
  }
</script>

<style>
</style>
