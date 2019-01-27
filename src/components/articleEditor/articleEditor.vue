<template>
  <div class="article-redact">
    <Row type="flex" justify="start" class="redact-row redact-info" :gutter="8">
      <Col :xs='24' :sm="12" :md="12" class="title">
        <span class="text title-text">文章标题：</span>
        <Input class="title-input" v-model="title" placeholder="文章标题..." clearable/>
      </Col>
      <Col :xs='24' :sm="10" :md="6" class="add-tag">
        <span class="text title-text">添加标签：</span>
        <Input class="title-input" placeholder="标签..." clearable v-model="newTag"/>
        <Button class="add-btn" type="success" @click="handleAddTag">Add</Button>
      </Col>
    </Row>
    <Row class="redact-row redact-info">
      <div class="tags">
        <span>文章标签：</span>
        <Tag v-for="(tag, index) in tags" :key="index" :name="index" closable @on-close="handleDeleteTag">{{tag}}</Tag>
      </div>
    </Row>
    <Row type="flex" justify="start" class="redact-row redact-info" :gutter="8">
      <Col span="12" class-name="content-md">
        <Input class="content-textarea" type="textarea" placeholder="开始表演吧..." v-model="mdText" ref="mdContent" />
        <div class="img-upload">
          <Icon class="icon" type="md-images" v-show="!isUploadShow" @click="isUploadShow = true"/>
          <Icon class="icon" type="md-close" v-show="isUploadShow" @click="isUploadShow = false"/>
          <Upload
                  class="upload-input"
                  v-show="isUploadShow"
                  name="smfile"
                  type="drag"
                  action="https://sm.ms/api/upload">
            <div style="padding: 20px 40px">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或者拖拽上传</p>
            </div>
          </Upload>
        </div>

      </Col>
      <Col span="12">
        <div class="content-show md2html" :rows="36" v-html="htmlText" ref="htmlContent"></div>
      </Col>
    </Row>
    <Row class="redact-row redact-info" :gutter="16">
      <Col :xs='24' :sm="12" :md="12" class="title">
        <span class="text title-text">文章摘要：</span>
        <Input class="digest-textarea" :rows="3" placeholder="文章摘要..." type="textarea" v-model="abstract"/>
      </Col>
    </Row>
    <div class="redact-row">
      <Button v-if="isNew" class="send-btn" type="success" @click="handleSendArticle(0)">公开发布</Button>
      <Button v-if="isNew" class="send-btn" type="success" @click="handleSendArticle(1)">私密发布</Button>
      <Button v-if="!isNew" class="send-btn" type="success" @click="handleChangeArticle()">发布修改</Button>
    </div>

    <Modal
            v-model="showModal"
            title="修改成功"
            @on-ok="modalClickOk"
           >
      <p>是否返回【内容管理页面】？</p>
    </Modal>
  </div>
</template>
<script>
  import Marked from 'marked';
  import highlight from 'highlight.js';

  export default {
    name: "redact",
    props: {
      isNew: {
        type: Boolean
      },
      articleId: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        title: '',
        tags: [],
        newTag: '',
        mdText: '',
        abstract: '',
        isUploadShow: true,
        showModal: false
      }
    },
    methods: {
      // 删除标签
      handleDeleteTag(event, name) {
        this.tags.splice(name, 1)
      },
      // 新增标签
      handleAddTag() {
        if (!this.newTag.length) {
          this.$Message.warning('拒绝添加空标签！');
          return;
        }
        if (this.tags.includes(this.newTag)) {
          this.$Message.warning('拒绝添加重复标签！');
          return;
        }
        this.tags.push(this.newTag);
        this.newTag = '';
      },
      // 发布文章
      handleSendArticle(type) {
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
          type: type
        };
        if (!this.validateForm(articleData)) {
          return;
        }
        this.$axios.post('articles/save', articleData)
          .then(res => {
            if (res.status === '0') {
              this.$Message.success('发布成功！');
              this.clearForm();
            }
          })
      },
      // 修改文章
      handleChangeArticle() {
        let newData = {
          title: this.title,
          tags: this.tags,
          lastDate: (new Date()).getTime(),
          abstract: this.abstract,
          content: this.htmlText,
          mdContent: this.mdText,
        };
        this.$axios.post('articles/change',{_id: this.articleId, newData: newData})
          .then(res => {
            if (res.status === '0') {
              this.showModal = true
            } else {
              this.$Message.error('发布失败!');
            }
          })
      },
      // 模态框OK
      modalClickOk() {
        this.$router.push({ path: '/admin'})
      },
      // 表单校验
      validateForm(data) {
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
      clearForm() {
        this.title = '';
        this.mdText = '';
        this.tags = [];
        this.abstract = '';
      }
      // 图片上传成功
    },
    created() {
      if(!this.isNew) {
        this.$axios.get('articles/single', {_id: this.articleId})
          .then(res => {
            let articleData = res[0];
            this.$nextTick(function () {
              this.title = articleData.title;
              this.tags = articleData.tags;
              this.mdText = articleData.mdContent;
              this.abstract = articleData.abstract;
            })
          })
      }
    },
    mounted() {
      Marked.setOptions({
        renderer: new Marked.Renderer(),
        smartLists: true,
        highlight: function (code) {
          return highlight.highlightAuto(code).value;
        }
      });
      // md 输入框内触发滚动事件时 预览内容同比例滚动
      let mdContent = this.$refs.mdContent.$el;
      let _this = this;
      mdContent.addEventListener('scroll', function () {
        let realArea = this.children[0];
        let scrollTop = realArea.scrollTop;
        let scrollHeight = realArea.scrollHeight - realArea.offsetHeight;
        let htmlContent = _this.$refs.htmlContent;
        htmlContent.scrollTop = (htmlContent.scrollHeight - htmlContent.offsetHeight) * (scrollTop / scrollHeight);
      },true)
    },
    computed: {
      htmlText() {
        return Marked(this.mdText);
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/md2html";
  @import "~highlight.js/styles/atom-one-light.css";

  .article-redact {
    padding-bottom: 20px;
    .redact-row {
      width: 100%;
      padding: 6px 10px;
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
    .content-md {
      position: relative;
      .img-upload {
        display: none;
        position: absolute;
        bottom: 4px;
        right: 10px;
        text-align: right;
      }
      .upload-input {
        margin-top: 10px;
      }
      .icon {
        font-size: @font-size-lg;
      }
    }


    .content-textarea {
      & > textarea {
        height: 700px;
        resize: none;
      }
    }
    .digest-textarea {
      & > textarea {
        resize: none;
      }
    }
    .content-show {
      border: 0.017857rem solid #dcdee2;
      height: 700px;
      border-radius: 0.071429rem;
      padding: 0.071429rem 0.125rem;
      overflow: scroll;
    }
    .send-btn {
      margin-right: 20px;
    }
  }
</style>
