<template>
  <div class="articleList">
    <div
            class="msg"
            v-if="!articleListData.length"
    >
      {{msg}}
    </div>

    <div
            class="list-item"
            v-for="(item, index) in articleListData"
            :key="index"
    >
      <div class="item-title">
        <router-link :to="{name: 'article', params: {articleId: item._id}}">
          {{item.title}}
        </router-link>
      </div>

      <div class="item-date">
          <span class="icon">
            <Icon type="ios-calendar"/>
          </span>
        <span class="text">{{item.date | formatDate}}</span>
      </div>
      <router-link :to="{name: 'article', params: {articleId: item._id}}">
        <div class="item-abstract">
          {{item.abstract}}
        </div>
      </router-link>
      <div class="item-info clearfix">
        <div class="item-tags" v-for="(tag, index) in item.tags" :key="index">
            <span class="icon">
              <Icon type="ios-pricetag"/>
            </span>
          <span class="text">
              <router-link :to="{name: 'tagArchived', params: {tag: tag}}">
              {{tag}}
              </router-link>
            </span>
        </div>
        <div class="item-readCount">
            <span class="icon">
              <Icon type="ios-eye"/>
            </span>
          <span class="text">{{item.readCount}}</span>
        </div>
      </div>
    </div>

    <div class="loadMsg">
      {{isLoadOver?'没有更多了':'加载中...'}}
    </div>
  </div>
</template>

<script>
  import {formatDate} from '@/assets/js/formatDate'

  export default {
    name: "articleList",
    data() {
      return {
        msg: '树苗种植中...',
        articleListData: [],
        page: 1,
        pageSize: 10,
        isInLoading: true,
        isLoadOver: false
      }
    },
    created() {
      this.getArticlesList(1);
    },
    mounted() {
      window.addEventListener('scroll',this.onScroll);
    },
    activated() {
      window.addEventListener('scroll',this.onScroll);
    },
    deactivated() {
      window.removeEventListener('scroll',this.onScroll);
    },
    beforeDestroy() {
      window.removeEventListener('scroll',this.onScroll);
    },
    methods: {
      getArticlesList() {
        let _this = this;
        let param = {
          page: _this.page,
          pageSize: _this.pageSize,
        };
        this.$LoadingBar.start();
        this.$axios.get('articles/list', param)
          .then(res => {
            this.$LoadingBar.finish();
            let list = res.result.list;
            // 更新页面数据
            let newList = this.articleListData.slice();
            newList.push(...list);
            this.articleListData = newList;
            // 检查是否全部加载完
            if(list.length < this.pageSize) {
              this.isLoadOver = true;
            }
            // 如果加载失败
            !this.articleListData.length && (this.msg = '网络出错啦！这里什么都没有！');

            this.page++;
            this.isInLoading = false;
          })
      },
      onScroll() {
        if(this.isInLoading || this.isLoadOver) {
          return
        }
        let pageHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
        let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
        let innerHeight = window.innerHeight || document.documentElement.clientHeight;
        if (pageHeight - (scrollTop + innerHeight) < 60) {
          this.isInLoading = true;
          this.getArticlesList()
        }
      }
    },
    filters: {
      formatDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .articleList {
    padding: 40px 10px 0;

    .msg {
      margin: 40px 0;
      font-size: @font-size-md;
      color: @color-link;
    }

    .ivu-icon {
      vertical-align: top;
    }

    .list-item {
      margin: 0 auto;
      padding: 40px 0;
      text-align: left;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2); /*no*/

      &:nth-last-child(2) {
        border-bottom: 0;
      }
    }

    .item-title {
      margin-bottom: 16px;
      line-height: 3.0;
      font-size: @font-size-md;
      font-weight: bold;
    }

    .item-date {
      font-size: @font-size-xs;
      line-height: 1;
      color: @color-tint;

      .icon {
        margin-right: 2px;
      }
    }

    .item-abstract {
      margin: 20px 0;
      font-size: @font-size-xs;
      line-height: 1.8;
      color: @color-base;
    }

    .item-info {
      line-height: 1;
    }

    .item-tags {
      float: left;
      margin-right: 8px;
      cursor: pointer;

      .icon {
        color: @color-tint;
        margin-right: 2px;
      }

      .text {
        color: #c3b74e;
      }
    }

    .item-readCount {
      margin-right: 4px;
      float: right;

      .icon {
        position: relative;
        bottom: -1px;
        margin-right: 4px;
        font-size: 16px;
      }
    }

    .loadMsg {
      padding: 6px 0;
      font-size: @font-size-xs;
      color: @color-tint;
    }
  }
</style>
