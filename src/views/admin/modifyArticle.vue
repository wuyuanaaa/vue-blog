<template>
  <div>
    <articleEditor :isNew="isNew" :articleId="articleId"></articleEditor>
  </div>
</template>

<script>
  import articleEditor from '@/components/articleEditor/articleEditor'

  export default {
    name: "modifyArticle",
    data() {
      return {
        isNew: false,
        articleId: this.$route.query._id,
      }
    },

    components: {
      articleEditor
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
