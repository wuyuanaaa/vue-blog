<template>
  <div class="home">
    <div class="head-wrapper">
      <div class="head-inner">
        <router-link to="/">
          <h1 class="title">吴予安</h1>
        </router-link>
        <p class="description">可能是甜点做的最好的前端</p>
      </div>
    </div>
    <div class="content">
      <articleList></articleList>
    </div>

  </div>
</template>

<script>
// @ is an alias to /src
import articleList from '@/components/articleList/articleList'

export default {
  name: 'home',
  components: {
    articleList
  }
}
</script>
<style lang="less" rel="stylesheet/less">
  .home {
    .head-wrapper {
      position: relative;
      width: 100%;
      padding-bottom: 58%;
      background: #fff url(../assets/head-bg.jpg) no-repeat;
      background-position: bottom -2px center;
      background-size: cover;
    }
    .head-inner {
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 30%;
      width: 100%;
      height: 100%;
      background: url(../assets/head-shade.png) no-repeat;
      background-position: bottom -2px center;
      background-size: contain;
      .title {
        margin-bottom: 30px;
        font-size: 40px;
        color: #fff;
        text-shadow: 0 0 4px #ccc;
      }
      .description {
        font-size: 24px;
        color: #fff;
        text-shadow: 0 0 4px #ccc;
      }
    }
    .content {
      position: relative;
      top: -2px;
      background: #fff;
    }

  }
</style>
