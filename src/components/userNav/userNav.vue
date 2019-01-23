<template>
  <div class="nav-bar ts" :class="{navShow: isNavShow}">
    <img class="nav-logo" src="../../assets/logo.svg" alt="">
    <div class="nav-list">
      <router-link to="/">
        <div class="list-item">
          <Icon class="item-icon" type="md-home"/>
          <div class="item-text">主页</div>
        </div>
      </router-link>
      <router-link to="/archived">
        <div class="list-item">
          <Icon class="item-icon" type="ios-copy"/>
          <div class="item-text">归档</div>
        </div>
      </router-link>
      <router-link to="/about">
        <div class="list-item">
          <Icon class="item-icon" type="ios-leaf"/>
          <div class="item-text">关于</div>
        </div>
      </router-link>
      <div class="list-item list-search" @click="handleSearch">
        <Icon class="item-icon" type="md-search"/>
        <div class="item-text">搜索</div>
      </div>
    </div>
    <div class="nav-more" @mouseenter="showMore = true" @mouseleave="showMore = false">
      <Icon v-if="!showMore" class="item-icon" type="md-apps" />
      <Icon v-if="showMore" class="item-icon" type="ios-arrow-up" />
      <transition name="fade">
        <div class="more-list" v-if="showMore">
          <a href="https://github.com/wuyuanaaa">
            <div class="list-item">
              <Icon type="logo-github" />
              <div class="item-text">GitHub</div>
            </div>
          </a>
          <a href="https://juejin.im/user/5bc6d92ce51d450e597ba327">
            <div class="list-item">
              <Icon type="md-book" />
              <div class="item-text">掘金</div>
            </div>
          </a>
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
  export default {
    name: "userNav",
    data () {
      return {
        showMore: false
      }
    },
    methods: {
      handleSearch() {
        this.$Message.warning('抱歉，还没实现呢!');
      }
    },
    props: {
      isNavShow: {
        type: Boolean
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
    .nav-more {
      position: absolute;
      padding: 10px 0;
      bottom: 20px;
      width: 100%;
      cursor: pointer;
      .more-list {
        position: absolute;
        bottom: 50px;
        padding-bottom: 10px;
        width: 100%;
      }
      .fade-enter-active, .fade-enter-active {
        transition: opacity 0.4s;
      }
      .fade-enter, .fade-leave-to {
        opacity: 1;
      }
    }
  }
</style>
