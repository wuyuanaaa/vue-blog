<template>
  <div class="one-image">
    <img class="img" :src="src" alt="">
    <div class="icons">
      <Icon class="icon" type="md-link" @click="copyClick"/>
      <Icon class="icon" type="md-trash" @click="deleteClick" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'oneImage',
  props: {
    src: {
      type: String,
      default: 'https://i.loli.net/2019/01/28/5c4ee9eda8db0.jpg'
    },
    index: {
      type: Number
    }
  },
  methods: {
    copyClick() {
      this.$copyText(this.src).then(() => {
        this.$Message.success('复制链接成功！');
      }, () => {
        this.$Message.error('复制链接失败！');
      })
    },
    deleteClick() {
      this.$emit('deleteClick',this.index);
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .one-image {
    display: inline-block;
    position: relative;
    width: 100%;
    height: auto;
    padding-bottom: 100%;
    border: 1px solid @color-border;
    .img {
      position: absolute;
      top: 0;
      left: 0;
      max-width: 100%;
      max-height: 100%;
    }
    .icons {
      position: absolute;
      bottom: 8px;
      right: 20px;
      .icon {
        margin: 0 0 0 40px;
        font-size: @font-size-lg;
        cursor: pointer;
      }
    }
  }
</style>