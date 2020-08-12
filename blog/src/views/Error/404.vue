<template>
  <div class="page404">
    <div class="center">
      <div class="tree" @click="treeClick">
        <span class="tree-one" />
        <span class="tree-two" />
        <span class="tree-three" />
        <span class="tree-four" />
      </div>
      <div class="line">
        <div class="line-item" />
        <div class="line-item" />
      </div>
      <div class="text">你好像跑出了森林的范围，这里啥都没有...</div>
      <div class="text text-two">点击小树传送回森林</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Page404',
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    treeClick() {
      this.$router.replace({ path: '/' })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .page404 {
    width: 100%;
    height: 100%;
    padding-top: 40px;
    background: #e6e6e6;
    .center {
      position: absolute;
      width: 400px;
      height: 300px;
      top: 40%;
      left: 50%;
      margin: -150px 0 0 -200px;
      .tree {
        position: absolute;
        bottom: 84px;
        right: -30px;
        width: 80px;
        height: 86px;
        transform-origin: bottom center;
        opacity: 0.3;
        cursor: pointer;
      }
      .tree-one,
      .tree-two,
      .tree-three {
        position: absolute;
        border-style: solid;
        border-color: transparent transparent #0e0e0e transparent;
        border-width: 0 40px 40px 40px;
      }
      .tree-one::after,
      .tree-two::after,
      .tree-three::after {
        content: '';
        position: absolute;
        border-style: solid;
        border-color: transparent transparent #009245 transparent;
      }
      .tree-one {
        top: 32px;
        left: 0;
        &::after {
          top: 6px;
          left: -30px;
          border-width: 0 30px 30px 30px;
        }
      }
      .tree-two {
        top: 16px;
        left: 0;
        transform: scale(0.8);
        &::after {
          top: 7px;
          left: -28px;
          border-width: 0 28px 28px 28px;
        }
      }
      .tree-three {
        top: 0;
        left: 0;
        transform: scale(0.6);
        &::after {
          top: 8px;
          left: -26px;
          border-width: 0 26px 26px 26px;
        }
      }
      .tree-four {
        position: absolute;
        bottom: -4px;
        left: 50%;
        margin-left: -8px;
        width: 16px;
        height: 20px;
        background: #603813;
        border: 4px solid #0e0e0e; /*no*/
      }

      .line {
        position: absolute;
        bottom: 60px;
        right: 0;
        width: 100%;
        height: 4px;
        background: #0e0e0e;
      }
      .line-item {
        position: absolute;
        top: 8px;
        right: 20px;
        width: 30px;
        height: 3px;
        background: #505050;
        &:nth-child(2) {
          right: 280px;
        }
      }
      .text {
        position: absolute;
        width: 400px;
        bottom: 20px;
        left: 50%;
        text-align: center;
        margin-left: -200px;
        font-size: 16px;
        font-weight: bold;
        color: #009245;
      }
      .text-two {
        bottom: 0;
      }
    }
  }
</style>
