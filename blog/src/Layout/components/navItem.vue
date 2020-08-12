<template>
  <router-link :to="'/'+nav.path" class="nav-item" :class="{actived: curRoute.name===nav.name}" @click.native="handleRouteClick">
    <svg-icon :icon-class="nav.meta.icon" class-name="item-icon" />
    <span class="item-text">{{ nav.meta.title }}</span>
  </router-link>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    nav: {
      type: Object,
      required: true
    }
  },
  computed: {
    curRoute() {
      return this.$route
    },
    isSmallScreen() {
      return this.$store.getters.isSmallScreen
    }
  },
  methods: {
    handleRouteClick() {
      this.isSmallScreen && this.$store.dispatch('app/updateIsNavShow', false)
    }
  }
}
</script>

<style lang="less" scoped>
.nav-item {
  display: inline-block;
  width: 60px;
  margin-bottom: 20px;
  padding: 10px;
  color: #172d3e;
  text-align: center;
  &.actived {
    color: @color-main;
    font-weight: bold;
  }
  .item-text {
    display: inline-block;
    margin-top: 4px;
    width: 100%;
  }
  &:hover {
    .item-text {
      text-decoration: underline;
    }
  }
}
</style>
