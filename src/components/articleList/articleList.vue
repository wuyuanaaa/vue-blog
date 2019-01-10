<template>
  <div class="articleList">
    <div
      class="list-item"
      v-for="(item, index) in articleListData"
      :key="index"
    >
      <div class="item-title">{{item.title}}</div>
      <div class="item-date">
        <span class="icon">
          <Icon type="ios-calendar" />
        </span>
        <span class="text">{{item.date | formatDate}}</span>
      </div>
      <div class="item-abstract">
        {{item.abstract}}
      </div>
      <div class="item-info clearfix">
        <div class="item-tags" v-for="(tag, index) in item.tags" :key="index">
          <span class="icon">
            <Icon type="ios-pricetag" />
          </span>
          <span class="text">{{tag}}</span>
        </div>
        <div class="item-readCount">
          <span class="icon">
            <Icon type="ios-eye" />
          </span>
          <span>{{item.readCount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from '@/assets/js/formatDate'
  export default {
    name: "articleList",
    data () {
      return {
        articleListData: ''
      }
    },
    created () {
      this.$http.get('./static/articleList.json')
        .then(res => {
          const data = res.data;
          if(data.code === 200) {
            this.articleListData = data.data;
          } else {
            throw new Error('获取数据失败！')
          }
        }).catch(e => {
        throw new Error(e)
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
  @import "../../assets/css/variable";
  .articleList {
    padding: 80px 20px;
    .ivu-icon {
      vertical-align: top;
    }
    .list-item {
      margin: 0 auto;
      padding: 60px 10px;
      max-width: 840px; /*no*/
      text-align: left;
      border-bottom: 1px solid rgba(0, 0, 0, 0.2); /*no*/
    }
    .item-title {
      line-height: 2.0;
      font-size: @font-size-lg;
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
      padding: 30px 0;
      font-size: @font-size-xs;
      line-height: 1.8;
    }
    .item-info {
      line-height: 1;
    }
    .item-tags {
      float: left;
      margin-right: 8px;
      cursor: pointer;
      .icon {
        vertical-align: top;
        color: @color-tint;
        margin-right: 2px;
      }
      .text {
        color: #c3b74e;
      }
    }
    .item-readCount {
      color: #c3b74e;
      float: right;
      .icon {
        font-size: 18px;
      }
    }
  }
</style>
