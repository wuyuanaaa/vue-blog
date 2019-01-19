<template>
  <div class="management">
    <Table border :columns="columns2" :data="data3">
      <template slot-scope="{ row, index }" slot="action">
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑</Button>
        <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">切换状态</Button>
        <Button type="error" size="small" @click="remove(index)">删除</Button>
      </template>
    </Table>
  </div>
</template>

<script>
  export default {
    name: "management",
    data () {
      return {
        columns2: [
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
            title: '状态',
            key: 'status',
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
        data3: [
          {
            title: 'John Brown',
            tags: 18,
            date: 'New York No. 1 Lake Park',
            lastDate: 'America',
            readCount: 'New York',
            status: 100000
          }
        ]
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .management {
    padding: 60px 20px;
    margin: 0 auto;
    max-width: 1264px;
  }
</style>
