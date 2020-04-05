<template>
  <div id="friendLink">
    <viewTitle title-text="友链" />
    <div class="link-lists">
      <div
        v-for="(item, index) in links"
        :key="index"
        class="link-item"
        :class="{active: index === showIndex}"
        @click="linkItemClick(index)"
      >
        <img class="item-background" :src="item.background" alt="背景">
        <div class="link-content">
          <img class="item-avatar" :src="item.avatar" alt="头像">
          <div class="link-info">
            <div class="item-title">{{ item.name }}</div>
            <div class="item-info">{{ item.info }}</div>
          </div>
          <a
            class="item-link"
            :href="item.link"
            target="_blank"
            :title="item.link"
            @click.stop="linkClick"
          >
            <svg-icon icon-class="link" class-name="icon" />
          </a>
        </div>
      </div>
    </div>

    <div class="link-rule">
      <div class="rule-title">关于友链：</div>
      <div class="rule-list">1、申请请发送 [ 网站名称、网站简介、网站链接、头像链接 ] 至 dao332508553@163.com；</div>
      <div class="rule-list">2、只添加技术博客类个人站点；</div>
      <div class="rule-list">3、并不强制双方互加，如果你的网站符合要求基本都可以为你加上；</div>
    </div>
  </div>
</template>

<script>
import viewTitle from '@/components/viewTitle/viewTitle'
export default {
  name: 'FriendLink',
  components: {
    viewTitle
  },
  data() {
    return {
      links: [
        {
          name: 'TaoLand',
          info: '行路有良友，便是捷径。带上我吧，一起去看更大的世界。',
          link: 'https://www.yangyuetao.cn/',
          avatar: 'https://www.yangyuetao.cn/static/img/p1.png',
          background: 'https://i.loli.net/2019/05/01/5cc9547106f2a.jpg'
        },
        {
          name: '旅途与画',
          info: '人生短暂，及时行乐。',
          link: 'https://www.luckydong.cn/',
          avatar: 'https://www.luckydong.cn/img/avatar.66121a89.jpg',
          background: 'https://i.loli.net/2019/05/01/5cc92b5656737.jpg'
        }
      ],
      showIndex: -1
    }
  },
  methods: {
    // 阻止冒泡
    linkClick() {

    },
    // 点击友链组
    linkItemClick(i) {
      this.showIndex = i === this.showIndex ? -1 : i
    }
  }
}
</script>

<style lang="less" scoped>
  #friendLink {
    margin: 0 auto;
    padding: 20px 20px;
    max-width: @content-max-Width;
    .link-item {
      position: relative;
      padding-top: 30%;
      overflow: hidden;
      transition: padding-top 0.3s;
      box-shadow: 0 0 6px @color-shadow;
      &+.link-item {
        margin-top: 20px;
      }
      &.active {
        padding-top: 62%;
        .item-background {
          opacity: 1;
          filter: grayscale(20%);
        }
      }
      .item-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: auto;
        z-index: -1;
        opacity: 0.7;
        filter: grayscale(60%);
        transition: all 0.3s;
      }
      .link-content {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        display: flex;
        padding: 5px;
        height: 60px;
        background-color: rgba(255,255,255,0.7);
      }
      .item-avatar {
        width: 50px;
        height: 50px;
      }
      .link-info {
        display: flex;
        flex: 1;
        flex-direction: column;
        justify-content: space-between;
        .item-title {
          font-size: @font-size-md;
          font-weight: bold;
          color: @color-main;
        }
        .item-info {
          font-size: @font-size-xs;
          color: @color-tint;
        }
      }
      .item-link {
        padding: 10px;
        align-self: center;
        font-size: 30px;
        color: @color-base;
      }
    }
    .link-rule {
      .rule-title {
        margin-top: 60px;
        text-align: center;
        font-weight: bold;
        font-size: @font-size-md;
        color: @color-tint;
      }
      .rule-list {
        margin-top: 10px;
        font-size: @font-size-xs;
        color: @color-tint;
      }
    }
  }

</style>
