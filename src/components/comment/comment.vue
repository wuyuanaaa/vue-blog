<template>
  <div class="comment" v-if="articleTitle">
    <div class="comment-title">评论</div>

    <commentInput :articleId="articleId" :articleTitle="articleTitle" @getComments="getComments"></commentInput>

    <div class="comment-list" v-if="comments">
      <commentItem v-for="(comment, index) in comments" :key="index" :comment="comment" @getComments="getComments"></commentItem>
    </div>

  </div>
</template>

<script>
  import commentInput from '@/components/comment/commentInput/commentInput'
  import commentItem from '@/components/comment/commentItem/commentItem'

  export default {
    name: "comment",
    props: {
      articleId: {
        type: String
      },
      articleTitle: {
        type: String
      }
    },
    data() {
      return {
        comments: [],
        currentFollowId: '',
        showFollowInput: {}
      }
    },
    mounted() {

    },
    methods: {
      // 获取评论
      getComments() {
        this.$axios.get('comments/get_comments',{article_id: this.articleId})
          .then(res => {
            if(res.status === '0') {
              console.log(res);
              this.comments = res.result;
            } else {
              console.warn(res.msg);
            }
          })
      },

    },
    components: {
      commentInput,
      commentItem
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .comment {
    .comment-title {
      margin-top: 20px;
      text-align: center;
      font-weight: bold;
      font-size: @font-size-md;
      color: @color-tint;
    }
    .comment-list {
      padding: 0 10px;
    }

  }
</style>
