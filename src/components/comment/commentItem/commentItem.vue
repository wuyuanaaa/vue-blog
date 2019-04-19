<template>
  <div class="comment-part comment-primary" >
    <img class="comment-avatar" :src="comment.avatar_url" alt="">
    <div class="comment-content">
      <div class="content-userName">{{comment.user}}</div>
      <div class="content-content">
        <span v-if="comment.follow_user">回复 <span class="content-userName">{{comment.follow_user}}</span>：</span>
        {{comment.comment_content}}
      </div>
      <div class="content-info">
        <span class="comment-date">{{comment.date | formatTime}}</span>
        <button class="comment-btn" @click="addFollowClick">回复</button>
        <commentInput
                v-if="isShowInput"
                @hideInput="hideInput"
                :currentFollowId="comment.follow_id || comment._id"
                :currentFollowUser="comment.user"
                @getComments="getComments"
        ></commentInput>
      </div>
      <commentItem
              v-for="(comment_f, index) in comment.comment_follow"
              :key="index"
              :comment="comment_f"
              @getComments="getComments"
      ></commentItem>
    </div>
  </div>
</template>

<script>
  import commentInput from '@/components/comment/commentInput/commentInput'
  import {formatTime} from '@/assets/js/formatTime'

  export default {
    name: "commentItem",
    props: {
      comment: {
        type: Object
      }
    },
    data() {
      return {
        isShowInput: false
      }
    },
    methods: {
      // 回复评论
      addFollowClick() {
        this.isShowInput = true;
      },
      // 移除输入框
      hideInput() {
        this.isShowInput = false;
      },
      // 传递 getComments
      getComments() {
        this.$emit('getComments');
      }
    },
    filters: {
      formatTime(time) {
        return formatTime(time);
      }
    },
    components: {
      commentInput
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
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
    &:last-child{
      margin-bottom: 0;
      .comment-content {
        border-bottom: none;
      }
    }
    .comment-content {
      flex: 1;
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
