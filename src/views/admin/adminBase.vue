<template>
  <div class="admin-base" v-if="isLogin">
    <Menu mode="horizontal" theme="light" active-name="1">
      <MenuItem name="1" to="/admin/management">
        <Icon type="ios-paper" />
        内容管理
      </MenuItem>
      <MenuItem name="2" to="/admin/imageManagement">
        <Icon type="md-images" />
        图片管理
      </MenuItem>
      <MenuItem name="3" to="/admin/newArticle">
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
          .then(res => {
            if (res.status === '0') {
              // this.$store.commit("updateUserInfo", '');
              this.userName = '';
              this.isLogin = false;
              this.$router.push({path: '/login'})
            }
          })
      }
    },
    created() {
      this.$axios.get('users/checkLogin')
        .then(res => {
          if (res.status === '0') {
            this.isLogin = true;
            this.userName = res.result.userName;
            // this.$store.commit("updateUserInfo", res.result.userName);
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
