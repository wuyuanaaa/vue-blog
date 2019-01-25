<template>
  <div class="main article">
    <div class="title">{{articleData.title}}</div>
    <div class="info">
      <div class="info-row tags">
        <div class="item-tags" v-for="(tag, index) in articleData.tags" :key="index">
          <span class="icon">
            <Icon type="ios-pricetag" />
          </span>
          <span class="text">{{tag}}</span>
        </div>
      </div>
      <div class="info-row clearfix">
        <div class="date" v-show="articleData.lastDate">最后编辑于：<span>{{articleData.lastDate | formatDate}}</span></div>
        <div class="read-count" v-show="articleData.readCount">阅读量：<span>{{articleData.readCount}}</span></div>
      </div>
    </div>
    <div class="content md2html" v-html="articleData.content">

    </div>
  </div>
</template>

<script>
  import {formatDate} from '@/assets/js/formatDate'

  export default {
    name: "articlePage",
    data () {
      return {
        articleId: '',
        articleData: ''
      }
    },
    created () {
      this.articleId = this.$route.params.articleId;

      this.$axios.get('articles/single',{_id: this.articleId})
        .then(res => {
          this.articleData = res[0];
        })
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/md2html.less";
  @import "~highlight.js/styles/atom-one-light.css";
  .article {
    padding: 40px 10px 60px;
    text-align: left;
    .title {
      margin-bottom: 40px;
      font-size: @font-size-lg;
      font-weight: bold;
    }
    .info-row {
      padding: 4px 0;
    }
    .tags {
      margin-bottom: 10px;
      font-size: @font-size-sm;
      line-height: 1;

      .text {
        color: @color-link;
        cursor: pointer;
      }
      .icon {
        margin-right: 6px;
      }
    }
    .date {
      float: left;
    }
    .read-count {
      margin-right: 4px;
      float: right;
    }
    .content {
      padding: 10px 0 0;
    }
  }


</style>
