<template>
  <div class="nav-bar ts" :class="{navShow: isNavShow}">
    <img class="nav-logo" src="../../assets/logo.svg" alt="">
    <div class="nav-list">
      <router-link to="/user/home">
        <div class="list-item">
          <Icon class="item-icon" type="md-home"/>
          <div class="item-text">主页</div>
        </div>
      </router-link>
      <router-link to="/user/archived">
        <div class="list-item">
          <Icon class="item-icon" type="md-git-commit"/>
          <div class="item-text">归档</div>
        </div>
      </router-link>
      <router-link to="/user/about">
        <div class="list-item">
          <Icon class="item-icon" type="md-list"/>
          <div class="item-text">关于</div>
        </div>
      </router-link>
      <!--<div class="list-item list-search" @click="handleSearch">-->
        <!--<Icon class="item-icon" type="md-search"/>-->
        <!--<div class="item-text">搜索</div>-->
      <!--</div>-->
    </div>

    <div class="nav-log" :class="{'isLogin': isLogin}" @click="logClick" :title="isLogin?'退出登陆':'使用github登陆'">
      <img class="avatar" :src="avatarUrl" alt="">
      <div class="userName">{{userName}}</div>
    </div>

    <!--退出登陆模态框-->
    <Modal
            v-model="logoutModal"
            title="操作提示"
            @on-ok="logoutModalOk"
            @on-cancel="logoutModalCancel">
      <p>确定要退出登陆？</p>
    </Modal>

    <div class="nav-menu ts" @click.stop="showNav">
      <img v-if="!isNavShow" class="nav-menu-img" src="../../assets/bird.png" alt="">
      <img v-if="isNavShow" class="nav-menu-img" src="../../assets/bird-active.png" alt="">
    </div>
  </div>
</template>

<script>
  export default {
    name: "userNav",
    props: {
      isNavShow: {
        type: Boolean
      }
    },
    data () {
      return {
        showMore: false,
        isBackTopShow: false,
        avatarUrl: 'https://i.loli.net/2019/04/17/5cb69f3a9606f.jpg',
        userName: '未登录',
        logoutModal: false
      }
    },
    created() {
      this.checkLog();
    },
    methods: {
      showNav() {
        this.$emit('navMenuClick')
      },
      // 登陆部分点击事件 未登陆则去登陆 已登陆则响应登出
      logClick() {
        if(!this.isLogin) {
          window.localStorage.setItem('_lastPage', window.location.href);
          window.location.href = 'https://github.com/login/oauth/authorize?client_id=5c971effe02228b9a039&scope=user:email';
        } else {
          this.logoutModal = true;
        }
      },
      logoutModalOk () {
        this.$store.commit('changeIsLogin',false);
        this.avatarUrl = 'https://i.loli.net/2019/04/17/5cb69f3a9606f.jpg';
        this.userName = '未登录';
        window.localStorage.removeItem('_login');
        this.$Message.success('登出成功!');

        this.$store.commit('updateUserInfo',{});
      },
      logoutModalCancel() {
        this.logoutModal = false;
      },
      checkLog() {
        let login = window.localStorage.getItem('_login');
        if (!login) {
          return ;
        }
        login = JSON.parse(login);
        // 计算登陆信息的时效
        let days = (new Date().getTime() - login.date) / (1000 * 3600 * 24);
        if (days > 10) {
          // 超过十天则情况 _login
          window.localStorage.removeItem('_login');
          return;
        }
        this.$store.commit('changeIsLogin',true);
        let data = login.data;
        this.avatarUrl = data.avatar_url;
        this.userName = data.name;
        this.$Message.success(this.userName + '，欢迎!');

        this.$store.commit('updateUserInfo',data);
      }
    },
    computed: {
      isLogin() {
        return this.$store.state.isLogin;
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/variable";
  .nav-bar {
    position: fixed;
    top: 0;
    right: -@side-width;
    padding: 40px 0;
    width: @side-width;
    height: 100%;
    background: rgba(0,0,0,0.04);
    &.navShow {
      right: 0;
    }
    .item-icon {
      font-size: 24px;
      margin-bottom: 6px;
    }
    .nav-logo {
      display: block;
      margin: 0 auto 40px;
      width: 40px;
    }
    .list-item {
      padding: 20px;
      color: #172d3e;
      &:hover {
        .item-text {
          text-decoration: underline;
        }
      }
    }
    .list-search {
      cursor: pointer;
    }

    .nav-log {
      position: absolute;
      bottom: 40px;
      width: 100%;
      text-align: center;
      cursor: pointer;
      .avatar {
        margin-bottom: 4px;
        width: 34px;
        height: 34px;
        border-radius: 50%;
      }
      .userName {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 12px;
        color: @color-tint;
      }
    }
    .isLogin {
      .userName {
        color: @color-main;
      }
    }

    .nav-menu {
      cursor: pointer;
      position: absolute;
      top: 20px;
      left: -50px;
      width: 50px;
      height: 40px;
      line-height: 36px;
      border-bottom: 2px solid #141818; /*no*/
      .nav-menu-img {
        height: 100%;
        margin-top: 4px;
      }
    }

  }
</style>
