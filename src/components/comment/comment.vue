<template>
  <div class="comment" v-if="articleTitle">
    <div class="comment-title">评论</div>
    <div class="comment-input">
      <Input
              class="input-textarea"
              v-model="commentValue"
              type="textarea"
              :autosize="true"
              @on-focus="textareaFocus"
              @on-blur="textareaBlur"
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
    <div class="comment-list" v-if="comments">
      <div class="comment-part comment-primary" v-for="(comment, index) in comments" :key="index">
        <img class="comment-avatar" :src="comment.avatar_url" alt="">
        <div class="comment-content">
          <div class="content-userName">{{comment.user}}</div>
          <div class="content-content">{{comment.comment_content}}</div>
          <div class="content-info">
            <span class="comment-date">{{comment.date}}</span>
            <button class="comment-btn">回复</button>
          </div>
        </div>
      </div>
    </div>

    <!--提示登陆模态框-->
    <Modal
            v-model="loginModal"
            title="登陆提示"
            @on-ok="loginModalOk"
            @on-cancel="loginModalCancel">
      <p>需要登陆，是否前往 github 授权登陆？</p>
    </Modal>

  </div>
</template>

<script>
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
        commentValue: '',
        isControlShow: false,
        loginModal: false,
        comments: {}
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
          this.loginModal = true;
          return;
        }
        let commentData = {
          article_title: this.articleTitle,
          article_id: this.articleId,
          user: userInfo.name,
          avatar_url: userInfo.avatar_url,
          comment_content: this.commentValue,
          comment_follow: []
        };
        this.$axios.post('comments/save_comment',commentData)
          .then(
            res => {
              if (res.status === '0'){
                this.$Message.success('评论成功！')
                // 清空输入框 触发输入框失焦事件
                this.commentValue = '';
                this.textareaBlur();
                this.getComments();
              } else {
                this.$Message.error('评论失败！请稍后再试。')
              }
            }
          )
      },
      // 登陆模态框确认
      loginModalOk() {
        window.location.href = 'https://github.com/login/oauth/authorize?client_id=5c971effe02228b9a039&scope=user:email';
      },
      // 登陆模态框取消
      loginModalCancel() {
        this.loginModal = false;
      },
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
      }
    },
    computed: {
      isCommentValueEmpty() {
        return this.commentValue.length === 0;
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
    .comment-input {
      margin: 20px 0;
      padding: 14px 10px;
      background: rgba(0,0,0,0.04);
    }
    .input-textarea>textarea {
      resize: none;
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
    .comment-list {
      padding: 0 10px;
    }
    .comment-part {
      display: flex;
      margin-bottom: 20px;
      .comment-avatar{
        margin-right: 10px;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        box-shadow: 0 0 4px rgba(0,0,0,0.14);
      }
      &:last-child .comment-content {
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
      margin-top: 10px;
      color: @color-tint;
      .comment-btn {
        float: right;
        border: none;
        background-color: transparent;
        color: inherit;
        font-size: 12px;
      }
    }
  }
</style>
