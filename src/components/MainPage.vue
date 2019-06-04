<template>
  <div  class="layout">
    <Layout>
      <Header style="margin-top: 0" >
        <Menu mode="horizontal" theme="dark" active-name="1" @on-select="onSelect">
          <div class="layout-nav">
            <Avatar icon="ios-person" size="large" />
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
