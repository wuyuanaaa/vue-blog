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
    <div class="nav-more" @mouseenter="showMore = true" @mouseleave="showMore = false" @click="showMore = !showMore">
      <Icon v-if="!showMore" class="item-icon" type="md-apps" />
      <Icon v-if="showMore" class="item-icon" type="ios-arrow-up" />
      <transition name="fade">
        <div class="more-list" v-if="showMore">
          <router-link to="/admin">
            <div class="list-item">
              <!--<Icon type="logo-github" />-->
              <div class="item-text"> </div>
            </div>
          </router-link>
          <a href="https://github.com/wuyuanaaa" target="_blank">
            <div class="list-item">
              <Icon type="logo-github" />
              <div class="item-text">GitHub</div>
            </div>
          </a>
          <a href="https://juejin.im/user/5bc6d92ce51d450e597ba327" target="_blank">
            <div class="list-item">
              <Icon type="md-book" />
              <div class="item-text">掘金</div>
            </div>
          </a>
        </div>
      </transition>
    </div>
    <div class="nav-menu ts" @click.stop="showNav">
      <Icon v-if="!isNavShow" type="md-menu" />
      <Icon v-if="isNavShow" type="md-arrow-round-forward" />
    </div>
    <div class="back-top" v-show="isBackTopShow" @click.stop="backTopClick">
      <Icon type="md-arrow-up" />
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
        isBackTopShow: false
      }
    },
    methods: {
      showNav() {
        this.$emit('navMenuClick')
      },
      backTopClick() {
        this.backToTop();
      },
      backToTop() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let speed = Math.floor(-scrollTop/10);
        if (scrollTop !== 0) {
          setTimeout(() => {
            document.documentElement.scrollTop = document.body.scrollTop = scrollTop + speed;
            this.backToTop();
          }, 8)
        }
      },
      checkIsBackTopShow() {
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        this.isBackTopShow = scrollTop > 300;
      }
    },
    mounted() {
      window.addEventListener('scroll', this.checkIsBackTopShow);
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.checkIsBackTopShow);
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
    .nav-menu,
    .back-top {
      cursor: pointer;
      position: absolute;
      left: -68px;
      width: 48px;
      height: 36px;
      line-height: 36px;
      border-radius: 4px;
      background: rgba(0,0,0,0.2);
      .ivu-icon {
        vertical-align: center;
        font-size: 24px;
        color: #fff;
      }
    }
    .nav-menu {
      display: none;
      top: 20px;
    }
    .back-top {
      bottom: 30px;
      transition: all 0.2s;
      &:hover {
        background: rgba(0,0,0,0.4);
      }
    }
  }
</style>
