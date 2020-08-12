<template>
  <div id="app">
    <Cloud />
    <router-view class="view" />
  </div>
</template>

<script>
import Cloud from '@/components/Cloud'

export default {
  components: {
    Cloud
  }
}
</script>

<style lang="scss" scoped>
  .view {
    position: relative;
  }
</style>
