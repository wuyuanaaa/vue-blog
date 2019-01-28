<template>
  <div class="image-management">
    <Row :gutter="16">
      <Col v-for="(item, index) in imgList" :key="index" :xs="12" :sm="6" :md="4" class="img-col" >
        <oneImage :src="item.url" :index="index" @deleteClick="deleteClick"></oneImage>
      </Col>
    </Row>
    <Modal
            v-model="deleteModal"
            title="删除图片"
            @on-ok="modalClickOk"
    >
      <p>确定要删除图片 {{currentImgFileName}} 么？ </p>
    </Modal>
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
      currentImgId: '',
      deleteModal: false
    }
  },
  methods: {
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
    deleteClick(index) {
      let currentImgData = this.imgList[index];
      this.currentImgFileName = currentImgData.filename;
      this.currentImgDeleteLink = currentImgData.delete;
      this.currentImgId = currentImgData._id;
      this.deleteModal = true;
    },
    modalClickOk() {
      window.open(this.currentImgDeleteLink);
      this.$axios.post('imgs/remove', {_id: this.currentImgId})
          .then(res => {
            if(res.status === '0') {
              this.$Message.success('删除成功!');
              this.upDate();
            }
          })
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
  }
</style>