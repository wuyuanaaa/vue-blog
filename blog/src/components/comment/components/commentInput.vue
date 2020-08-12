<template>
  <div>
    <div class="comment-input" @click.stop="inputClick">
      <Textarea
        ref="inputTextarea"
        v-model="commentValue"
        class="input-textarea"
        :autofocus="autofocus"
        placeholder="说点什么..."
        @on-focus="textareaFocus"
      />
      <div v-show="isControlShow" class="input-control clearfix">
        <button
          class="control-commit"
          :disabled="isCommentValueEmpty ? 'disabled' : false"
          @click="newCommentClick"
        >
          评论
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Textarea from '@/components/Textarea'
import { saveComment, saveFollowComment } from '@/api/comment'

export default {
  name: 'CommentInput',
  components: {
    Textarea
  },
  props: {
    articleId: {
      type: String,
      default: ''
    },
    articleTitle: {
      type: String,
      default: ''
    },
    currentFollowId: {
      type: String,
      default: ''
    },
    currentFollowUser: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      commentValue: '',
      isControlShow: false
    }
  },
  computed: {
    isCommentValueEmpty() {
      return this.commentValue.length === 0
    }
  },
  created() {
    // 添加 document 的 click 事件， 点击非输入组件部分隐藏输入组件
    if (this.currentFollowId) {
      document.addEventListener('click', this.hideInput, false)
    } else {
      document.addEventListener('click', this.textareaBlur, false)
    }
  },
  mounted() {
    if (this.currentFollowId) {
      this.$refs.inputTextarea.focus()
    }
  },
  beforeDestroy() {
    // 移除 document 的 click 事件
    if (this.currentFollowId) {
      document.removeEventListener('click', this.hideInput, false)
    } else {
      document.removeEventListener('click', this.textareaBlur, false)
    }
  },
  methods: {
    textareaFocus() {
      this.isControlShow = true
    },
    textareaBlur() {
      this.isCommentValueEmpty && (this.isControlShow = false)
    },
    // 发表一级评论
    newCommentClick() {
      const userInfo = this.$store.getters.userInfo
      if (!userInfo.id) {
        this.$store.dispatch('app/updateIsLoginDialogShow', true)
        return
      }
      const commentData = {
        user: userInfo.name,
        avatar_url: userInfo.avatar_url,
        comment_content: this.commentValue
      }
      let requestFn
      if (this.currentFollowId) {
        requestFn = saveFollowComment
        commentData.follow_id = this.currentFollowId
        commentData.follow_user = this.currentFollowUser
      } else {
        requestFn = saveComment
        commentData.article_title = this.articleTitle
        commentData.article_id = this.articleId
        commentData.comment_follow = []
      }
      requestFn(commentData)
        .then(() => {
          this.$Message.success('评论成功！')
          // 清空输入框 触发输入框失焦事件
          this.commentValue = ''
          this.textareaBlur()
          this.$emit('getComments')
          // 如果是二级评论 隐藏输入框
          if (this.currentFollowId) {
            this.$emit('hideInput')
          }
        }).catch(() => {
          this.$Message.error('评论失败！请稍后再试。')
        })
    },

    // 隐藏输入框
    hideInput() {
      if (!this.commentValue) {
        this.$emit('hideInput')
      }
    },
    // inputClick
    inputClick() {
      return false
    }
  }
}
</script>

<style lang="less" scoped>
  .comment-input {
    margin: 10px 0;
    padding: 14px 10px;
    border-radius: 4px;
    background-color: rgba(0,0,0,0.02);
    .input-textarea {
      overflow-x: hidden;
    }
    .input-textarea>textarea {
      resize: none;
      overflow-x: hidden;
    }
    .input-control {
      margin-top: 10px;
      .control-commit {
        float: right;
        width: 60px;
        height: 30px;
        border: none;
        border-radius: 4px;
        background-color: @color-main;
        color: #fff;
        cursor: pointer;
      }
      .control-commit[disabled] {
        opacity: 0.6;
        cursor: default;
      }
    }
  }

</style>
