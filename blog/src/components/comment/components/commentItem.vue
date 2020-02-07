<template>
  <div class="comment-part">
    <img class="comment-avatar" :src="comment.avatar_url" alt="">
    <div class="comment-content">
      <div class="content-userName">{{ comment.user||'用户名好像不见了' }}</div>
      <div class="content-content">
        <span v-if="comment.follow_user">回复 <span class="content-userName">{{ comment.follow_user }}</span>：</span>
        {{ comment.comment_content }}
      </div>
      <div class="content-info">
        <span class="comment-date">{{ comment.date | formatTime }}</span>
        <button class="comment-btn" @click="addCommentClick">
          <Icon class="comment-icon" type="ios-text-outline" />
          <span class="comment-text">回复</span>
        </button>
        <button v-if="isRemoveShow" class="comment-btn" @click="removeCommentClick(comment._id, topCommentId)">
          <Icon class="comment-icon" type="md-trash" />
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
      return this.$store.state.userInfo.id === 35567374
    }
  },
  methods: {
    // 回复评论
    addCommentClick() {
      this.isShowInput = true
    },
    // 删除评论
    removeCommentClick(id, topId) {
      const param = {
        _id: id
      }
      let url = 'comments/remove_comment'
      if (topId) {
        param.top_id = topId
        url = 'comments/remove_follow_comment'
      }
      this.$axios.post(url, param)
        .then(res => {
          if (res.status === '0') {
            this.$Message.success('删除成功!')
            this.getComments()
          }
          if (res.status === '3') {
            this.$Message.error(res.msg)
          }
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

<style lang="less" rel="stylesheet/less">
  .comment-part {
    display: flex;
    padding: 10px 0;
    /*margin: 20px 0 10px;*/
    .comment-avatar{
      margin-right: 10px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      box-shadow: 0 0 4px rgba(0,0,0,0.10);
    }
    &:last-child{
      margin-bottom: 0;
      .comment-content {
        border-bottom: none;
      }
    }
    .comment-content {
      flex: 1;
      padding-bottom: 10px;
      border-bottom: 1px solid @color-border; /*no*/
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
        float: right;
        margin-left: 20px;
        border: none;
        background-color: transparent;
        color: inherit;
        cursor: pointer;
      }
      .comment-icon {
        margin-top: 4px;
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
