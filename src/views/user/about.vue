<template>
  <div class="about">
    <viewTitle titleText="关于"></viewTitle>
    <div class="about-part clearfix">
      <span class="part-title">版本</span>
      <div class="path-info">
        <div class="info-item">v1.0</div>
      </div>
    </div>
    <div class="about-part clearfix">
      <span class="part-title">UI</span>
      <div class="path-info">
        <div class="info-item">模仿自博客<a href="https://zhwangart.github.io/">数学家</a>，非常喜欢这套主题</div>
      </div>
    </div>
    <div class="about-part clearfix">
      <span class="part-title">前端</span>
      <div class="path-info">
        <div class="info-item">Vue全家桶</div>
      </div>
    </div>
    <div class="about-part clearfix">
      <span class="part-title">后端</span>
      <div class="path-info">
        <div class="info-item">Nodejs+Express+MongoDB</div>
      </div>
    </div>
    <div class="about-part clearfix">
      <span class="part-title">flag</span>
      <div class="path-info">
        <div class="info-item">完成全局搜索功能</div>
        <div class="info-item">增加评论功能</div>
        <div class="info-item">增加文章锚点功能</div>
        <div class="info-item">完善更多动效</div>
      </div>
    </div>

  </div>
</template>

<script>
  import viewTitle from '@/components/viewTitle/viewTitle'
  export default {
    name: "about",
    data() {
      return {

      }
    },
    components: {
      viewTitle
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .about {
    margin: 0 auto;
    padding: 20px 20px;
    max-width: @content-max-Width;
    .about-part {
      text-align: left;
      .part-title {
        float: left;
        display: inline-block;
        margin: 5px 0 0 2px;
        border-bottom: 2px solid @color-base; /*no*/
        font-size: @font-size-sm;
      }
      .path-info {
        padding: 10px 0;
        margin-left: 80px;
        border-left: 1px dashed @color-border; /*no*/
      }
      .info-item {
        position: relative;
        padding: 0 0 30px 40px;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -8.5px;
          width: 16px;
          height: 16px;
          /*border-radius: 100%;*/
          transform: rotate(45deg);
          background: #d3d3d3;
        }
      }
    }
  }
</style>
