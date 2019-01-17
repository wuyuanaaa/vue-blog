<template>
  <div class="admin-base" v-if="isLogin">
    <Menu mode="horizontal" theme="light" active-name="1">
      <MenuItem name="1" to="/admin/management">
        <Icon type="ios-paper" />
        内容管理
      </MenuItem>
      <MenuItem name="2">
        <Icon type="ios-people" />
        用户管理
      </MenuItem>
      <Submenu name="3">
        <template slot="title">
          <Icon type="ios-stats" />
          统计分析
        </template>
        <MenuGroup title="使用">
          <MenuItem name="3-1">新增和启动</MenuItem>
          <MenuItem name="3-2">活跃分析</MenuItem>
          <MenuItem name="3-3">时段分析</MenuItem>
        </MenuGroup>
        <MenuGroup title="留存">
          <MenuItem name="3-4">用户留存</MenuItem>
          <MenuItem name="3-5">流失用户</MenuItem>
        </MenuGroup>
      </Submenu>
      <MenuItem name="4" to="/admin/redact">
        <Icon type="md-add" />
        新增文章
      </MenuItem>
      <div class="user">
        <span class="user-name">Hi,{{userName}}</span>
        <span class="log-out" @click="handleClickLogout">退出</span>
      </div>
    </Menu>
    <router-view></router-view>
  </div>
</template>

<script>

  export default {
    name: "adminBase",
    data () {
      return {
        isLogin: false,
        userName: ''
      }
    },
    methods: {
      handleClickLogout () {
        this.$axios.post('users/logout')
          .then(response => {
            let res = response.data;
            if (res.status === '0') {
              this.$store.commit("updateUserInfo", '');
              this.userName = '';
              this.isLogin = false;
              this.$router.push({path: '/login'})
            }
          })
      }
    },
    created() {
      this.$axios.get('users/checkLogin')
        .then(response => {
          let res = response.data;
          if (res.status === '0') {
            this.isLogin = true;
            this.userName = res.result.userName;
            this.$store.commit("updateUserInfo", res.result.userName);
          } else {
            this.$router.push({path: '/login'})
          }
        })
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .admin-base {
    .user {
      float: right;
      padding-right: 40px;
      .log-out {
        margin-left: 10px;
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
</style>
