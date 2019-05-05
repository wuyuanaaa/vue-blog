<template>
  <div class="management">
    <Table border :columns="columns" :data="formatList" :loading="tableLoading">
      <template slot-scope="{ row, index }" slot="articleTitle">
        <a :href=articleLink(list[index]._id) target="_blank">{{list[index].title}}</a>
      </template>
      <template slot-scope="{ row, index }" slot="action">
        <Button class="btn" type="primary" size="small" style="margin-right: 5px" @click="handleModify(index)">编辑</Button>
        <Button class="btn" type="primary" size="small" style="margin-right: 5px" @click="handleTypeChange(index)">切换</Button>
        <Button class="btn" type="error" size="small" style="margin-right: 5px" @click="handleRemove(index)">删除</Button>
      </template>
    </Table>
    <div class="page">
      <Page
              prev-text="上一页"
              next-text="下一页"
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
      <p>确定要删除么？ </p>

    </Modal>
  </div>
</template>

<script>
  import {formatDate} from '@/assets/js/formatDate'

  export default {
    name: "management",
    data() {
      return {
        total: 0,
        page: 1,
        pageSize: 10,
        list: [],
        tableLoading: true,
        columns: [
          {
            title: '标题',
            slot: 'articleTitle',
            minWidth: 120,
            fixed: 'left',
            // ellipsis: true
          },
          {
            title: '标签',
            key: 'tags',
            minWidth: 80,
            maxWidth: 140
          },
          {
            title: '创建时间',
            key: 'date',
            minWidth: 80,
            maxWidth: 140
          },
          {
            title: '最后编辑时间',
            key: 'lastDate',
            minWidth: 80,
            maxWidth: 140
          },
          {
            title: '阅读量',
            key: 'readCount',
            width: 80,
            align: 'center'
          },
          {
            title: '类型',
            key: 'type',
            width: 80,
            align: 'center'
          },
          {
            title: '编辑',
            slot: 'action',
            fixed: 'right',
            align: 'center',
            minWidth: 80,
            maxWidth: 180
          }
        ],
        removeModal: false,
        removeId: ''
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
          this.tableLoading = false;
          this.$nextTick(function () {
            this.total = res.result.total;
            this.list = res.result.list;
          });
        })
      },
      handlePageChange(val) {
        this.page = val;
        this.tableLoading = true;
        this.upDate();
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
            }
            if(res.status === '3') {
              this.$Message.error(res.msg);
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
            if(res.status === '3') {
              this.$Message.error(res.msg);
            }

          })
      },
      articleLink(id) {
        return 'https://blog.yuanaaa.top/article/'+id;
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
          list.lastDate = formatDate(new Date(val.lastDate || list.date), 'yyyy-MM-dd hh:mm');
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
    .btn {
      margin: 6px 0;
    }
  }
</style>
