<template>
  <div>
    <div class="comment-input" @click.stop="inputClick">
      <Input
              class="input-textarea"
              v-model="commentValue"
              type="textarea"
              :autosize="true"
              :autofocus="autofocus"
              @on-focus="textareaFocus"
              ref="inputTextarea"
              placeholder="说点什么..."
      />
      <div class="input-control clearfix" v-show="isControlShow">
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
  export default {
    name: "commentInput",
    props: {
      articleId: {
        type: String
      },
      articleTitle: {
        type: String
      },
      currentFollowId: {
        type: String
      },
      currentFollowUser: {
        type: String
      },
      autofocus: {
        type: Boolean
      }
    },
    data() {
      return {
        commentValue: '',
        isControlShow: false
      }
    },
    created() {
      // 添加 document 的 click 事件， 点击非输入组件部分隐藏输入组件
      if(this.currentFollowId) {
        document.addEventListener('click',this.hideInput,false);
      } else {
        document.addEventListener('click',this.textareaBlur,false);
      }
    },
    mounted() {
      if(this.currentFollowId) {
        this.$refs.inputTextarea.focus();
      }
    },
    beforeDestroy() {
      // 移除 document 的 click 事件
      if(this.currentFollowId) {
        document.removeEventListener('click',this.hideInput,false);
      } else {
        document.removeEventListener('click',this.textareaBlur,false)
      }

    },
    methods: {
      textareaFocus() {
        this.isControlShow = true;
      },
      textareaBlur() {
        this.isCommentValueEmpty && (this.isControlShow = false);
      },
      // 发表一级评论
      newCommentClick() {
        let userInfo = this.$store.state.userInfo;
        if (!userInfo.id) {
          this.$store.commit('changeIsLoginModalShow');
          return;
        }
        let commentData = {
          user: userInfo.name,
          avatar_url: userInfo.avatar_url,
          comment_content: this.commentValue,
        };
        let url = '';
        if(this.currentFollowId) {
          url = 'comments/save_follow_comment';
          commentData.follow_id = this.currentFollowId;
          commentData.follow_user = this.currentFollowUser;
        } else {
          url = 'comments/save_comment';
          commentData.article_title = this.articleTitle;
          commentData.article_id = this.articleId;
          commentData.comment_follow = [];
        }
        this.$axios.post(url,commentData)
          .then(
            res => {
              if (res.status === '0'){
                this.$Message.success('评论成功！');
                // 清空输入框 触发输入框失焦事件
                this.commentValue = '';
                this.textareaBlur();
                this.$emit('getComments');
                // 如果是二级评论 隐藏输入框
                if(this.currentFollowId) {
                  this.$emit('hideInput');
                }
              } else {
                this.$Message.error('评论失败！请稍后再试。')
              }
            }
          )
      },

      // 隐藏输入框
      hideInput() {
        if(!this.commentValue) {
          this.$emit('hideInput');
        }
      },
      // inputClick
      inputClick() {
        return false;
      }
    },
    computed: {
      isCommentValueEmpty() {
        return this.commentValue.length === 0;
      }
    },
  }
</script>

<style lang="less" rel="stylesheet/less">
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
        font-size: @font-size-xs;
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
