<template>
  <div class="comment-part">
    <img v-imgMore class="comment-avatar" :src="comment.avatar_url" alt="">
    <div class="comment-content">
      <div class="content-userName">{{ comment.user||'用户名好像不见了' }}</div>
      <div class="content-content">
        <span v-if="comment.follow_user">回复 <span class="content-userName">{{ comment.follow_user }}</span>：</span>
        {{ comment.comment_content }}
      </div>
      <div class="content-info">
        <span class="comment-date">{{ comment.date | formatTime }}</span>
        <button class="comment-btn comment-btn-reply" @click="addCommentClick">
          <svg-icon icon-class="comment" class-name="comment-icon" />
          <span class="comment-text">回复</span>
        </button>
        <button v-if="isRemoveShow" class="comment-btn" @click="removeCommentClick(comment._id, topCommentId)">
          <svg-icon icon-class="delete" class-name="comment-icon" />
          <span class="comment-text">删除</span>
        </button>
        <commentInput
          v-if="isShowInput"
          :current-follow-id="comment.follow_id || comment._id"
          :current-follow-user="comment.user"
          @hideInput="hideInput"
          @getComments="getComments"
        />
      </div>
      <commentItem
        v-for="(comment_f, index) in comment.comment_follow"
        :key="index"
        :comment="comment_f"
        :top-comment-id="comment._id"
        class="comment-follow"
        @getComments="getComments"
      />
    </div>
  </div>
</template>

<script>
import commentInput from './commentInput'
import { removeComment, removeFollowComment } from '@/api/comment'
import { formatTime } from '@/utils'

export default {
  name: 'CommentItem',
  filters: {
    formatTime(time) {
      return formatTime(time)
    }
  },
  components: {
    commentInput
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    topCommentId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      isShowInput: false
    }
  },
  computed: {
    isRemoveShow() {
      return this.$store.getters.userInfo.id === 35567374
    }
  },
  methods: {
    // 回复评论
    addCommentClick() {
      this.isShowInput = true
    },
    // 删除评论
    removeCommentClick(id, topId) {
      const data = {
        _id: id
      }
      let requestFn
      if (topId) {
        data.top_id = topId
        requestFn = removeFollowComment
      } else {
        requestFn = removeComment
      }
      requestFn(data)
        .then(() => {
          this.$Message.success('删除成功!')
          this.getComments()
        }).catch((e) => {
          this.$Message.error(e.msg || '删除失败')
        })
    },
    // 移除输入框
    hideInput() {
      this.isShowInput = false
    },
    // 传递 getComments
    getComments() {
      this.$emit('getComments')
    }
  }
}
</script>

<style lang="less" scoped>
  .comment-part {
    display: flex;
    padding: 10px 0;
    &:last-child{
      margin-bottom: 0;
      .comment-content {
        border-bottom: none;
      }
    }
    &:hover {
      .content-info .comment-btn {
        display: block;
      }
    }
    .comment-avatar{
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-shadow: 0 0 4px rgba(0,0,0,0.10);
    }
    .comment-content {
      flex: 1;
      padding-bottom: 10px;
      border-bottom: 1px solid @color-border-tint; /*no*/
      .content-userName {
        margin-bottom: 6px;
        color: @color-main;
      }
      .content-content {
        line-height: 1.4;
      }
    }
    .content-info {
      margin: 10px 0;
      color: @color-tint;
      transition: height 0.5s;
      .comment-btn {
        display: none;
        float: right;
        margin-left: 20px;
        border: none;
        background-color: transparent;
        color: inherit;
        cursor: pointer;
      }
      .comment-icon {
        margin-top: 4px;
        margin-right: 4px;
        font-size: 16px;
        vertical-align: top;
      }
      .comment-text {
        display: inline-block;
        vertical-align: top;
      }
    }
    div.comment-follow {
      padding: 10px;
      background: rgba(0,0,0,0.02);
      .comment-content {
        padding-bottom: 0;
      }
      .comment-input {
        background-color: #fff;
      }
    }
  }

</style>
