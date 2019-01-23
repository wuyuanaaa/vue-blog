<template>
  <div class="archived">
    <viewTitle titleText="归档"></viewTitle>
    <div class="year-part clearfix" v-for="(item, index) of yearsData" :key="index">
      <span class="year-num">{{item.year}}</span>
      <div class="year-list">
        <div class="list-item" v-for="(list, i) of item.list" :key="i">
          <span class="list-date">{{list.date | formatDate}}</span>
          <span class="list-title">
            <router-link :to="{name: 'article', params: {articleId: list._id}}">
            {{list.title}}
            </router-link>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import viewTitle from '@/components/viewTitle/viewTitle'
  import {formatDate} from '@/assets/js/formatDate'

  export default {
    name: "archived",
    data() {
      return {
        articleListData: '',
        yearsData: []
      }
    },
    methods: {
      getYearsData() {
        let count = 0;
        let years = {};
        this.articleListData.forEach((current) => {
          let year = new Date(current.date).getFullYear();
          if (years[year] !== 0 && !year[year]) {
            years[year] = count;
            this.yearsData.push({
              year: year,
              list: [{
                title: current.title,
                date: current.date,
                _id: current._id
              }]
            });
            count++;
          } else {
            this.yearsData[years[year]].list.push({
              title: current.title,
              date: current.date,
              _id: current._id
            })
          }
        });
      }
    },
    created() {
      this.$axios.get('articles/list',{})
        .then(res => {
          this.articleListData = res.result.list;
          this.$nextTick(this.getYearsData);
        })
    },
    filters: {
      formatDate (time) {
        let date = new Date(time);
        return formatDate(date, 'MM/dd');
      }
    },
    components: {
      viewTitle
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .archived {
    margin: 0 auto;
    padding: 20px 20px;
    max-width: @content-max-Width;
    .year-part {
      text-align: left;
      .year-num {
        float: left;
        display: inline-block;
        margin: 5px 0 0 2px;
        border-bottom: 2px solid @color-base; /*no*/
        font-size: @font-size-sm;
      }
      .year-list {
        padding: 10px 0;
        margin-left: 80px;
        border-left: 1px dashed @color-border; /*no*/
      }
      .list-item {
        display: flex;
        position: relative;
        padding: 0 0 30px 40px;
        &::before {
          content: '';
          position: absolute;
          top: 0;
          left: -9.5px;
          width: 18px;
          height: 18px;
          border-radius: 100%;
          background: #d3d3d3;
        }
      }
      .list-date {
        flex: 0 0 60px;
      }
      .list-title {
        flex: 1;
      }
    }
  }
</style>
