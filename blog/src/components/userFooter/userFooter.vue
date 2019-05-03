<template>
  <div class="appFooter">
    <ul class="footer-list">
      <li class="list-item"><span class="heart">♥</span></li>
      <li class="list-item">所有者： <a href="https://github.com/wuyuanaaa">吴予安</a><span class="line"> | </span>上线于：<a href="https://admin.yuanaaa.top" target="_blank">2019/01/23</a></li>
      <li class="list-item"><a href="http://www.miitbeian.gov.cn/">鄂ICP备19000975号</a></li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: "userFooter"
  }
</script>

<style lang="less" rel="stylesheet/less">
  .footer-list {
    padding: 20px 0 36px;
    text-align: center;
    border-top: 1px dashed rgba(0, 0, 0, 0.1); /*no*/
    .list-item {
      /*display: inline-block;*/
      padding: 0 10px;
      font-size: 12px;
      line-height: 1;
      list-style: none;
      a {
        color: #236666;
      }
      .line {
        color: #000;
      }
    }
    .list-item + .list-item {
      margin-top: 10px;
      /*border-left: 1px solid #ccc; !*no*!*/
    }
    .heart {
      display: inline-block;
      font-size: 12px;
      animation: heartbeat 1s infinite;
    }
  }

</style>
