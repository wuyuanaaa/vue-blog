<template>
  <div class="appFooter">
    <ul class="footer-list">
      <li class="list-item">♥ Powered by <a href="https://blog.yuanaaa.top">吴予安</a></li>
      <li class="list-item"><a href="http://www.miitbeian.gov.cn/">鄂ICP备19000975号</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "appFooter"
  }
</script>

<style lang="less" rel="stylesheet/less">
  .footer-list {
    padding: 10px 0;
    text-align: center;
    .list-item {
      display: inline-block;
      padding: 0 10px;
      line-height: 1;
    }
    .list-item + .list-item {
      border-left: 1px solid #ccc; /*no*/
    }
  }
</style>
