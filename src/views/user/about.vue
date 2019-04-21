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
      <span class="part-title">作者</span>
      <div class="path-info">
        <div class="info-item">大龄转行者，可能是前端里面甜点做的最好的。</div>
      </div>
    </div>
    <div class="about-part clearfix">
      <span class="part-title">简介</span>
      <div class="path-info">
        <div class="info-item">“自有林中趣，谁惊岁去频”出自唐代无可的《新年》，开始敲这个博客是在18年年末，当时的确很应景。但我个人还有另外一层理解，转行这些时间，因为年龄，因为过往经历，的确给我带来了很多困境。我想通过这句话告诉自己：无论外界的环境是什么样子的，过往已无法改变，只有保留内心的‘林中趣’，做好当下的事情才是最重要的。</div>
        <div class="info-item">
          更多请见这篇文章
          <router-link :to="{path:'/user/article/5c653ae3dfd2132f88bbd089'}">
            《Hello World》
          </router-link>
        </div>
      </div>
    </div>
    <div class="about-part clearfix">
      <span class="part-title">UI</span>
      <div class="path-info">
        <div class="info-item">最初版模仿自博客<a href="https://zhwangart.github.io/" target="_blank">数学家</a>，非常喜欢这套主题</div>
      </div>
    </div>
    <div class="about-part clearfix">
      <span class="part-title">源码</span>
      <div class="path-info">
        <div class="info-item"><a href="https://github.com/wuyuanaaa/vue-blog" target="_blank">github 仓库地址</a></div>
      </div>
    </div>
    <div class="about-part clearfix">
      <span class="part-title">功能</span>
      <div class="path-info">
        <div class="info-item">详见上方 github 仓库 README</div>
      </div>
    </div>
    <div class="about-part clearfix">
      <span class="part-title">技术栈</span>
      <div class="path-info">
        <div class="info-item">前端：Vue Cli3、Vue Router、Vuex、iView ...</div>
        <div class="info-item">后端：Nodejs、Express、Mongoose ...</div>
        <div class="info-item">数据库：MongoDB</div>
      </div>
    </div>

    <div class="about-part clearfix">
      <span class="part-title">近期flag</span>
      <div class="path-info">
        <div class="info-item info-disable">完成全局搜索功能</div>
        <div class="info-item">增加评论功能 √</div>
        <div class="info-item">增加文章列表下拉加载 √</div>
        <div class="info-item">增加评论表情支持</div>
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
        margin: 2px 0 0 2px;
        border-bottom: 2px solid @color-base; /*no*/
        font-size: @font-size-sm;
      }
      .path-info {
        padding: 6px 0;
        margin-left: 80px;
        border-left: 1px dashed @color-border; /*no*/
      }
      .info-item {
        position: relative;
        padding: 0 0 30px 40px;
        line-height: 1.8;
        &::before {
          content: '';
          position: absolute;
          top: 4px;
          left: -6.6px;
          width: 12px;
          height: 12px;
          /*border-radius: 100%;*/
          transform: rotate(45deg);
          background: #d3d3d3;
        }
      }
      .info-disable {
        text-decoration: line-through;
      }
    }
  }
</style>
