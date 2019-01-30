<template>
  <div class="image-management">
    <Row :gutter="16">
      <Col v-for="(item, index) in imgList" :key="index" :xs="12" :sm="6" :md="4" class="img-col" >
        <oneImage :src="item.url" :index="index" @deleteClick="deleteClick" @resizeClick="resizeClick"></oneImage>
      </Col>
    </Row>
    <Modal
            v-model="deleteModal"
            title="删除图片"
            @on-ok="modalClickOk"
    >
      <p>确定要删除图片 <b>{{currentImgFileName}}</b> 么？ </p>
      <p>由于图床设置，该操作会打开一个新的标签页。</p>
    </Modal>
    <transition name="fade">
      <div class="image-enlargement" v-show="isEnlargementShow" @click="isEnlargementShow = !isEnlargementShow">
        <img class="img-current" :src=currentImgSrc alt="">
      </div>
    </transition>
  </div>
</template>

<script>
import oneImage from '@/components/oneImage/oneImage'
export default {
  name: 'imageManagement',
  data() {
    return {
      page: 1,
      pageSize: 20,
      total: 0,
      imgList: [],
      currentImgFileName: '',
      currentImgDeleteLink: '',
      currentImgSrc: '',
      currentImgId: '',
      deleteModal: false,
      isEnlargementShow: false
    }
  },
  methods: {
    // 更新数据
    upDate() {
      let param = {
        page: this.page,
        pageSize: this.pageSize
      };
      this.$axios.get('imgs/list',param)
          .then(res => {
            this.$nextTick(function () {
              this.total = res.result.total;
              this.imgList = res.result.list;
            })
          })
    },
    // 点击删除
    deleteClick(index) {
      let currentImgData = this.imgList[index];
      this.currentImgFileName = currentImgData.filename;
      this.currentImgDeleteLink = currentImgData.delete;
      this.currentImgId = currentImgData._id;
      this.deleteModal = true;
    },
    // 删除确认模态框
    modalClickOk() {
      this.$axios.post('imgs/remove', {_id: this.currentImgId})
          .then(res => {
            if(res.status === '0') {
              this.$Message.success('删除成功!');
              window.open(this.currentImgDeleteLink);
              this.upDate();
            }
            if(res.status === '3') {
              this.$Message.error(res.msg);
            }
          })
    },
    resizeClick(index) {
      this.currentImgSrc = this.imgList[index].url;
      this.isEnlargementShow = true;
    }
  },
  created() {
    this.upDate();
  },
  components: {
    oneImage
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .image-management {
    padding: 20px 10px;
    margin: 0 auto;
    max-width: 1264px;
    .img-col {
      margin-bottom: 10px;
    }
    .image-enlargement {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      .img-current {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate3d(-50%,-50%,0);
        max-width: 100%;
        max-height: 100%;
      }
    }
    .fade-enter-active, .fade-leave-active {
      transition: opacity .3s;
    }
    .fade-enter, .fade-leave-to {
      opacity: 0;
    }

  }
</style>