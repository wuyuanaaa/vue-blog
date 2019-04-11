<template>
  <div>
    <timeLine :timeLineName="tag" apiName="tag" :para="para"></timeLine>
  </div>
</template>

<script>
  import timeLine from '@/components/timeLine/timeLine'
  export default {
    name: "tagArchived",
    data() {
      return {
        tag: '',
        para: {}
      }
    },
    methods: {
      resetData() {
        this.tag = this.$route.params.tag;
        this.para = {tag: this.tag};
      }
    },
    created() {
      this.resetData();
    },
    components: {
      timeLine
    },
    watch: {
      '$route': 'resetData'
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
