<template>
  <div class="archived app-container">
    <timeLine time-line-name="归档" api-name="list" />
  </div>
</template>

<script>
import timeLine from '@/components/timeLine/timeLine'

export default {
  name: 'Archived',
  components: {
    timeLine
  }
}
</script>

<style lang="less" rel="stylesheet/less">

</style>
