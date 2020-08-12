<template>
  <div v-if="articleTitle" class="comment">
    <div class="comment-title">评论</div>

    <commentInput :article-id="articleId" :article-title="articleTitle" @getComments="fetchComments" />

    <div v-if="comments" class="comment-list">
      <commentItem v-for="(comment, index) in comments" :key="index" :comment="comment" @getComments="fetchComments" />
    </div>

  </div>
</template>

<script>
import { getComment } from '@/api/comment'
import commentInput from './components/commentInput'
import commentItem from './components/commentItem'

export default {
  name: 'Comment',
  components: {
    commentInput,
    commentItem
  },
  props: {
    articleId: {
      type: String,
      required: true
    },
    articleTitle: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      comments: [],
      currentFollowId: '',
      showFollowInput: {}
    }
  },
  methods: {
    // 获取评论
    fetchComments() {
      getComment(this.articleId)
        .then(res => {
          this.comments = res
        })
        .catch(e => {
          console.log('fetchComments err', e)
        })
    }

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
