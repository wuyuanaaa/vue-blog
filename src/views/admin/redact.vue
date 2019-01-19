<template>
  <div class="redact">
    <Row type="flex" justify="start" class="redact-row redact-info" :gutter="16">
      <Col span="12" class="title">
        <span class="text title-text">文章标题：</span>
        <Input class="title-input" v-model="title" placeholder="文章标题..." clearable  />
      </Col>
      <Col span="8" class="add-tag">
        <span class="text title-text">添加标签：</span>
        <Input class="title-input" placeholder="标签..." clearable v-model="newTag" />
        <Button class="add-btn" type="success" @click="handleAddTag">Add</Button>
      </Col>
    </Row>
    <Row class="redact-row redact-info">
      <div class="tags">
        <span>文章标签：</span>
        <Tag v-for="(tag, index) in tags" :key="index" :name="index" closable @on-close="handleDeleteTag">{{tag}}</Tag>
      </div>
    </Row>
    <Row type="flex" justify="start" class="redact-row redact-info" :gutter="16">
      <Col span="12">
        <Input class="content-textarea" type="textarea" placeholder="开始表演吧..." v-model="mdText"/>
      </Col>
      <Col span="12">
        <div class="content-show md2html" :rows="36" v-html="htmlText"></div>
      </Col>
    </Row>
    <Row class="redact-row redact-info" :gutter="16">
      <Col span="12" class="title">
        <span class="text title-text">文章摘要：</span>
        <Input class="digest-textarea" :rows="4" placeholder="文章摘要..." type="textarea"  v-model="abstract"/>
      </Col>
    </Row>
    <div class="redact-row">
      <Button class="send-btn" type="success" @click="handleSendArticle(0)">公开发布</Button>
      <Button class="send-btn" type="success" @click="handleSendArticle(1)">私密发布</Button>
    </div>
  </div>
</template>
<script>
  import Marked from 'marked';
  import highlight from 'highlight.js';

  export default {
    name: "redact",
    data () {
      return {
        title: '',
        mdText: '',
        tags: [],
        newTag: '',
        abstract: ''
      }
    },
    methods: {
      // 删除标签
      handleDeleteTag (event, name) {
        this.tags.splice(name, 1)
      },
      // 新增标签
      handleAddTag () {
        if(!this.newTag.length) {
          this.$Message.warning('拒绝添加空标签！');
          return;
        }
        if(this.tags.includes(this.newTag)) {
          this.$Message.warning('拒绝添加重复标签！');
          return;
        }
        this.tags.push(this.newTag);
        this.newTag = '';
      },
      // 发布文章
      handleSendArticle (status) {
        let time = (new Date()).getTime();
        let articleData = {
          title: this.title,
          date: time,
          lastDate: time,
          tags: this.tags,
          readCount: 0,
          abstract: this.abstract,
          content: this.htmlText,
          mdContent: this.mdText,
          status: status
        };
        if (!this.validateForm(articleData)) {
          return;
        }
        this.$axios.post('articles/save',{
          status: 1,
          data: articleData
        })
          .then(res => {
            if (res.status === 200) {
              this.$Message.success('发布成功！');
              this.clearForm();
            }
          })
      },
      // 表单校验
      validateForm (data) {
        const list = [
          {type: 'title', msg: '还没写标题呢！'},
          {type: 'tags', msg: '不加标签怎么归档？'},
          {type: 'content', msg: '正文都没有发个啥！！'},
          {type: 'abstract', msg: '加上摘要首页才好看啊！'},
        ];
        for (let i = 0; i < list.length; i++) {
          let type = list[i].type;
          if (!data[type].length) {
            this.$Message.error(list[i].msg);
            return false;
          }
        }
        return true;
      },
      // 清空表单
      clearForm () {
        this.title = '';
        this.mdText = '';
        this.tags = [];
        this.abstract = '';
      }
    },
    mounted () {
      Marked.setOptions({
        renderer: new Marked.Renderer(),
        smartLists: true,
        highlight: function (code) {
          return highlight.highlightAuto(code).value;
        }
      })
    },
    computed: {
      htmlText () {
        return Marked(this.mdText);
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/md2html";
  @import "~highlight.js/styles/atom-one-light.css";
  .redact {
    padding-bottom: 40px;
    .redact-row {
      width: 100%;
      padding: 10px 20px;
      text-align: left;
      .text {
        font-size: @font-size-xs;
      }
    }
    .redact-info {
      position: relative;
      .title,
      .add-tag {
        display: flex;
        .title-text {
          flex: 0 0 70px;
          vertical-align: center;
          line-height: 34px;
          font-weight: bold;
        }
        .title-input {
          flex: 1;
          height: 40px;
        }
      }
      .add-tag {
        .add-btn {
          margin-left: 10px;
          height: 32px;
        }
      }
      .tags {
        line-height: 30px;
      }
    }
    .content-textarea {
      &>textarea {
        height: 760px;
        resize: none;
      }
    }
    .digest-textarea {
      &>textarea {
        resize: none;
      }
    }
    .content-show {
      border: 0.017857rem solid #dcdee2;
      height: 760px;
      border-radius: 0.071429rem;
      padding: 0.071429rem 0.125rem;
      overflow: scroll;
    }
    .send-btn {
      margin-right: 20px;
    }
  }

</style>
