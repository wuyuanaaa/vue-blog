<template>
  <div class="main article">
    <div class="title">{{articleData.title}}</div>
    <div class="info">
      <div class="info-row tags">
        <div class="item-tags" v-for="(tag, index) in articleData.tags" :key="index">
          <span class="icon">
            <Icon type="ios-pricetag"/>
          </span>
          <span class="text">
            <router-link :to="{name: 'tagArchived', params: {tag: tag}}">
            {{tag}}
            </router-link>
          </span>
        </div>
      </div>
      <div class="info-row clearfix">
        <div class="date" v-show="articleData.lastDate">最后编辑于：<span>{{articleData.lastDate | formatDate}}</span></div>
        <div class="read-count" v-show="articleData.readCount">阅读量：<span>{{articleData.readCount}}</span></div>
      </div>
    </div>
    <div class="content md2html" v-show="articleData.content" v-html="articleData.content">

    </div>
    <div class="more clearfix">
      <div class="more-item more-prev" v-if="prev">
        <router-link :to="{name: 'article', params: {articleId: prev._id}}" replace>
          上一篇：{{prev.title}}
        </router-link>
      </div>

      <div class="more-item more-next" v-if="next">
        <router-link :to="{name: 'article', params: {articleId: next._id}}" replace>
          下一篇：{{next.title}}
        </router-link>
      </div>
    </div>
    <comment ref="comment" :articleId="articleId" :articleTitle="articleData.title"></comment>
  </div>
</template>

<script>
  import {formatDate} from '@/assets/js/formatDate'
  import comment from '@/components/comment/comment'

  export default {
    name: "articlePage",
    data() {
      return {
        articleId: '',
        articleData: '',
        prev: '',
        next: ''
      }
    },
    created() {
      this.articleId = this.$route.params.articleId;
      this.getData();
    },
    methods: {
      getData() {
        this.$axios.get('articles/single', {_id: this.articleId})
          .then(res => {
            this.articleData = res[0];

            // 获取上一篇及下一篇
            let curDate = this.articleData.date;
            this.$axios.get('articles/prev', {date: curDate})
              .then(res => {
                this.prev = res[0];
              });
            this.$axios.get('articles/next', {date: curDate})
              .then(res => {
                this.next = res[0];
              });

            // 获取评论
            this.$refs.comment.getComments();
          })
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    beforeRouteUpdate(to, from, next) {
      if (from.name === 'article') {
        this.articleId = to.params.articleId;
        this.getData();
      }
      next();
    },
    components: {
      comment
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/md2html.less";
  @import "~highlight.js/styles/atom-one-light.css";

  .article {
    padding: 40px 10px 10px;
    text-align: left;

    .title {
      margin-bottom: 20px;
      font-size: @font-size-lg;
      font-weight: bold;
    }

    .info {
      padding: 6px;

    }

    .info-row {
      padding: 4px 0;
    }

    .tags {
      margin-bottom: 10px;
      font-size: @font-size-sm;
      line-height: 1;

      .item-tags {
        display: inline;

        & + .item-tags {
          margin-left: 10px;
        }
      }

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
      padding-bottom: 20px;
      border-top: 1px solid @color-border;
      border-bottom: 1px solid @color-border;
    }

    .more {
      margin-top: 10px;
      line-height: 30px;
      .more-item {
        max-width: 48%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .more-prev {
        float: left;
      }
      .more-next {
        float: right;
      }
    }
  }

</style>
