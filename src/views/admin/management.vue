<template>
  <div class="management">
    <Table border :columns="columns" :data="formatList">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="handleModify(index)">编辑</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="handleTypeChange(index)">切换状态</Button>
        <Button type="error" size="small" @click="handleRemove(index)">删除</Button>
      </template>
    </Table>
    <div class="page" v-if="total > 10">
      <Page
              prev-text="Previous"
              next-text="Next"
              :total="total"
              :page-size="pageSize"
              @on-change="handlePageChange"
              show-total
      />
    </div>

    <Modal
            v-model="removeModal"
            title="删除"
            @on-ok="modalClickOk"
      >
      <p>确定要删除么？</p>

    </Modal>
  </div>
</template>

<script>
  import {formatDate} from '@/assets/js/formatDate'

  export default {
    name: "management",
    data() {
      return {
        total: '',
        page: 1,
        pageSize: 10,
        list: [],
        columns: [
          {
            title: '标题',
            key: 'title',
            width: 260,
            fixed: 'left'
          },
          {
            title: '标签',
            key: 'tags',
            width: 200
          },
          {
            title: '创建时间',
            key: 'date',
            width: 160
          },
          {
            title: '最后编辑时间',
            key: 'lastDate',
            width: 160
          },
          {
            title: '阅读量',
            key: 'readCount',
            width: 100
          },
          {
            title: '类型',
            key: 'type',
            width: 100
          },
          {
            title: '编辑',
            slot: 'action',
            fixed: 'right',
            align: 'center',
            width: 200
          }
        ],
        removeModal: false,
        removeId: '',
        firstUpdate: true
      }
    },
    methods: {
      upDate () {
        let param = {
          page: this.page,
          pageSize: this.pageSize,
          all: '1'
        };
        this.$axios.get('articles/list', param).then(res => {
          if(this.firstUpdate) {
            this.$nextTick(function () {
              this.total = res.result.total;
              this.list = res.result.list;
            });
            this.firstUpdate = false
          } else {
            this.total = res.result.total;
            this.list = res.result.list;
          }

        })
      },
      handlePageChange(val) {
        console.log(val);
      },
      // 编辑
      handleModify(i) {
        let id = this.list[i]._id;
        this.$router.push({ path: 'modifyArticle', query: { _id: id }});
      },
      handleTypeChange (i) {
        let id = this.list[i]._id;
        let newData = this.list[i].type === 1 ? {type: 0} : {type: 1};
        this.$axios.post('articles/change',{_id: id, newData: newData})
          .then(res => {
            if (res.status === '0') {
              this.$Message.success('切换成功!');
              this.upDate();
            } else {
              this.$Message.error('切换失败!');
            }
          })
      },
      handleRemove(i) {
        this.removeModal = true;
        this.removeId = this.list[i]._id;
      },
      modalClickOk(){
        this.$axios.post('articles/remove', {_id: this.removeId})
          .then(res => {
            if(res.status === '0') {
              this.$Message.success('删除成功!');
              this.upDate();
            }
          })
      }
    },
    computed: {
      formatList() {
        return this.list.map(val => {
          let list = {};
          list._id = val._id;
          list.title = val.title;
          list.tags = val.tags.reduce((a, b) => a + ',' + b);
          list.date = formatDate(new Date(val.date), 'yyyy-MM-dd hh:mm');
          list.lastDate = val.lastDate || list.date;
          list.readCount = val.readCount;
          list.type = val.type === 1 ? '私密' : '公开';
          return list;
        });
      }
    },
    created() {
      this.upDate();
    },
    mounted() {

    },
  }
</script>

<style lang="less" rel="stylesheet/less">
  .management {
    padding: 60px 20px;
    margin: 0 auto;
    max-width: 1264px;
    .page {
      margin-top: 20px;
    }
  }
</style>
