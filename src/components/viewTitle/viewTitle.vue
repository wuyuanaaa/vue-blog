<template>
  <div class="viewTitle">
    <h2 class="title-text">{{titleText}}</h2>
  </div>
</template>

<script>
  export default {
    name: "viewTitle",
    props: {
      titleText: {
        type: String,
        default: '页面标题'
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/variable";
  .viewTitle {
    padding: 30px 0;
    .title-text {
      text-align: left;
      font-size: @font-size-lg;
    }
  }
</style>
