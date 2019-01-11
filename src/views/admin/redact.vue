<template>
  <div class="redact">
    <Row type="flex" justify="start" class="redact-row redact-info" :gutter="16">
      <Col span="12" class="title">
        <span class="text title-text">文章标题：</span>
        <Input class="title-input" placeholder="Enter something..." clearable  />
      </Col>
      <Col span="12"></Col>
    </Row>
    <Row type="flex" justify="start" class="redact-row redact-info" :gutter="16">
      <Col span="12">
        <Input class="content-textarea" type="textarea" :rows="40" placeholder="Enter something..." />
      </Col>
      <Col span="12">
        <Input class="content-textarea" type="textarea" :rows="40" placeholder="Enter something..." />
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    name: "redact",
    data () {
      return {
        text: ''
      }
    },
    methods: {

    },
    components: {

    }

  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/variable";
  .redact-row {
    width: 100%;
    padding: 20px ;
    text-align: left;
    .text {
      font-size: @font-size-xs;
    }
  }
  .redact-info {
    .title {
      display: flex;

      .title-text {
        vertical-align: center;
        line-height: 34px;
      }
      .title-input {
        flex: 1;
        height: 40px;
      }
    }
  }
  .content-textarea {
    &>textarea {
      resize: none;
    }
  }
</style>
