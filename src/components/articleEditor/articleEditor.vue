<template>
  <div class="article-redact">
    <Row type="flex" justify="start" class="redact-row redact-info" :gutter="8">
      <Col :xs='24' :sm="12" :md="12" class="title">
        <span class="text title-text">文章标题：</span>
        <Input class="title-input" v-model="title" placeholder="文章标题..." clearable/>
      </Col>
      <Col :xs='12' :sm="10" :md="8" class="add-tag">
        <span class="text title-text">添加标签：</span>
        <Input class="title-input" placeholder="标签..." clearable v-model="newTag"/>
        <Button class="add-btn" type="primary" @click="handleAddTag" icon="md-add"></Button>
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
        <Input class="content-textarea" type="textarea" placeholder="开始表演吧..." v-model="mdContent" ref="mdContent"/>
        <div class="img-upload">
          <Icon class="icon" type="md-images" v-show="!isUploadShow" @click="isUploadShow = true"/>
          <Icon class="icon" type="md-close" v-show="isUploadShow" @click="isUploadShow = false"/>
          <form class="img-form" enctype="multipart/form-data" method="post" name="fileinfo" v-show="isUploadShow">
            <input class="img-input" id="" type="file" name="smfile" required ref="imgInput" @change="uploadImg"/>
            <div
                    class="img-content"
                    @click="uploadImgClick"
                    @dragover.stop.prevent="() => {}"
                    @dragenter.stop.prevent="() => {}"
                    @drop.prevent.stop="uploadImgDrop">
              <div class="text">点击或者拖拽上传图片</div>
              <Icon class="icon" type="ios-cloud-upload-outline"/>
            </div>
          </form>
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

    <Modal
            v-model="showLocalStorageModal"
            title="本地存档"
            :closable="false"
            :mask-closable="false"
            @on-ok="modalLocalStorageClickOk"
            @on-cancel="modalLocalStorageClickCancel"
    >
      <p>检测到有未发布的本地存档，是否恢复存档继续上次的编辑？</p>
      <p>ps:取消则会删除本地存档!</p>
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
        mdContent: '',
        abstract: '',
        isUploadShow: false,
        showModal: false,
        showLocalStorageModal: false,
        form: {},
        timer: null,
        catalog: [],
        content: ''
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
      // 添加本地存档
      setLocalStorage() {
        let articleData = {
          title: this.title,
          tags: this.tags,
          abstract: this.abstract,
          mdContent: this.mdContent
        };
        window.localStorage.setItem('_article', JSON.stringify(articleData));
      },
      // 自动保存事件
      autoSave() {
        if (this.title.length || this.tags.length || this.mdContent.length || this.abstract.length) {
          this.setLocalStorage();
          this.$Message.success('自动保存成功！');
        } // 有内容则保存
        this.timer = setTimeout(this.autoSave, 1000 * 60); // 1分钟一次
      },
      // 恢复存档至页面
      modalLocalStorageClickOk() {
        let articleData = JSON.parse(window.localStorage.getItem('_article'));
        this.title = articleData.title;
        this.tags = articleData.tags;
        this.abstract = articleData.abstract;
        this.mdContent = articleData.mdContent;
        this.autoSave();
      },
      // 取消恢复存档,重新开始自动记录存档
      modalLocalStorageClickCancel() {
        window.localStorage.removeItem('_article'); // 移除存档
        this.autoSave();
      },
      // 检测存档是否与当前数据相同，如果不同则弹窗提醒
      checkIsSameAsLocalStorage() {
        if (window.localStorage.getItem('_article')) {
          let articleData = JSON.parse(window.localStorage.getItem('_article'));
          if (articleData.title !== this.title || articleData.tags.join('') !== this.tags.join('') || articleData.mdContent !== this.mdContent || articleData.abstract !== this.abstract) {
            this.showLocalStorageModal = true;
          } else {
            this.autoSave();
          }
        } else {
          this.autoSave();
        }
      },
      // 生成目录
      createCatalog() {
        let tree = [];
        const title = {H1: 1, H2: 1, H3: 1, H4: 1, H5: 1};
        traverseNode(this.$refs['htmlContent']);

        function traverseNode(node) {
          let tag = node.tagName,
            children = node.children;

          if (title[tag]) {
            let id = tag + '-' + title[tag];
            tree.push({
              lev: parseInt(tag.slice(1)),
              text: node.innerText,
              id: id
            });
            node.setAttribute('id', id);
            title[tag]++;
          }
          for (let i = 0, len = children.length; i < len; i++) {
            traverseNode(children[i])
          }
        }

        this.catalog = tree;
        this.content = this.$refs['htmlContent'].innerHTML;
      },
      // 发布文章
      handleSendArticle(type) {
        this.setLocalStorage(); // 保存至本地，因为提交请求后如果登陆超时会跳转登陆页面
        this.createCatalog(); // 生成目录
        let time = (new Date()).getTime();
        let articleData = {
          title: this.title,
          date: time,
          lastDate: time,
          tags: this.tags,
          readCount: 0,
          abstract: this.abstract,
          content: this.content,
          mdContent: this.mdContent,
          type: type,
          catalog: this.catalog
        };
        if (!this.validateForm(articleData)) {
          return;
        }
        this.$axios.post('articles/save', articleData)
          .then(res => {
            if (res.status === '0') {
              this.$Message.success('发布成功！');
              this.clearForm();
              window.localStorage.removeItem('_article'); // 移除存档
            }
            if (res.status === '3') {
              this.$Message.error(res.msg);
            }
          })
      },
      // 修改文章
      handleChangeArticle() {
        this.setLocalStorage(); // 保存至本地，因为提交请求后如果登陆超时会跳转登陆页面
        this.createCatalog(); // 生成目录
        let newData = {
          title: this.title,
          tags: this.tags,
          lastDate: (new Date()).getTime(),
          abstract: this.abstract,
          content: this.content,
          mdContent: this.mdContent,
          catalog: this.catalog
        };
        this.$axios.post('articles/change', {_id: this.articleId, newData: newData})
          .then(res => {
            if (res.status === '0') {
              this.showModal = true;
              window.localStorage.removeItem('_article'); // 移除存档
            }
            if (res.status === '3') {
              this.$Message.error(res.msg);
            }
          })
      },
      // 模态框OK
      modalClickOk() {
        this.$router.push({path: '/admin'})
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
        this.mdContent = '';
        this.tags = [];
        this.abstract = '';
      },
      // 图片上传
      uploadImgClick() {
        this.$refs.imgInput.click();
      },
      uploadImgDrop(event) {
        this.postImg(event.dataTransfer.files[0])
      },
      uploadImg() {
        this.setLocalStorage(); // 保存至本地，因为提交请求后如果登陆超时会跳转登陆页面
        this.postImg()
      },
      postImg(file) {
        let oData = new FormData(this.from);
        file && oData.append('smfile', file);

        this.$axios.post('https://sm.ms/api/upload', oData)
          .then(res => {
            let imgData = res.data;
            this.mdContent += `![${imgData.filename}](${imgData.url})`;
            this.$axios.post('imgs/save', imgData)
              .then(res => {
                if (res.status === '0') {
                  this.$Message.success('图片上传成功！');
                }
              })
          })
      },
    },
    created() {
      if (!this.isNew) {
        this.$axios.get('articles/single', {_id: this.articleId})
          .then(res => {
            let articleData = res[0];
            this.title = articleData.title;
            this.tags = articleData.tags;
            this.mdContent = articleData.mdContent;
            this.abstract = articleData.abstract;
            this.checkIsSameAsLocalStorage();
          })
      } else {
        this.checkIsSameAsLocalStorage();
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
      }, true);
      this.from = document.forms.namedItem("fileinfo");
    },
    beforeDestroy() {
      clearTimeout(this.timer);
    },
    computed: {
      htmlText() {
        return Marked(this.mdContent);
      }
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  @import "../../assets/css/md2html";
  @import "~highlight.js/styles/atom-one-light.css";

  .article-redact {
    padding: 10px 0 20px;

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
        position: absolute;
        bottom: 4px;
        right: 10px;
        text-align: right;
      }

      .icon {
        font-size: @font-size-lg;
        cursor: pointer;
      }

      .img-form {
        position: relative;
        margin: 0 0 1% 20%;
        width: 80%;
        height: 100px;
        border: 1px dashed @color-border;
        background: rgba(255, 255, 255, 0.8);

        &:hover {
          border-color: rgba(0, 0, 0, 0.5);
        }
      }

      .img-input {
        opacity: 0;
      }

      .img-content {
        position: absolute;
        top: 0;
        left: 0;
        box-sizing: border-box;
        padding: 20px 0 0 0;
        text-align: center;
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

      .text {
        margin-bottom: 10px;
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
