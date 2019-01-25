<template>
  <div class="home">
    <div class="head-wrapper">
      <div class="head-inner">
        <router-link to="/">
          <h1 class="title">吴予安</h1>
        </router-link>
        <p class="description">自有林中趣 | 谁惊岁去频</p>
        <img class="logo" src="../../assets/logo.svg" alt="">
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
      background: #fff url(../../assets/head-bg.jpg) no-repeat;
      background-position: bottom -2px center;
      background-size: cover;
    }
    .head-inner {
      position: absolute;
      top: 0;
      left: 0;
      padding-top: 26%;
      width: 100%;
      height: 100%;
      background: url(../../assets/head-shade.png) no-repeat;
      background-position: bottom -2px center;
      background-size: 101% auto;
      .title {
        margin-bottom: 3.4%;
        font-size: @font-size-lg;
        opacity: 0.9;
        color: rgba( 255, 255, 255, 1);
        text-shadow: 0 0 10px #595959;
      }
      .description {
        margin-bottom: 2%;
        font-size: @font-size-sm;
        opacity: 1;
        color: #ebebeb;
        text-shadow: 0 0 10px #595959;
      }
      .logo {
        width: 56px;
        opacity: 0.7;
      }
    }
    .content {
      position: relative;
      margin: 0 auto;
      padding: 0 20px;
      max-width: @content-max-Width;
      top: -2px;
      background: #fff;
    }

  }
</style>
