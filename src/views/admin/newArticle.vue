<template>
  <div class="redact">
    <articleEditor :isNew="isNew"></articleEditor>
  </div>
</template>
<script>
  import articleEditor from '@/components/articleEditor/articleEditor';

  export default {
    name: "redact",
    data () {
      return {
        isNew: true
      }
    },
    components: {
      articleEditor
    }
  }
</script>
<style lang="less" rel="stylesheet/less">

</style>
