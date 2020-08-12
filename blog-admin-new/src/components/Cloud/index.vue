<template>
  <div class="cloud-wrap">
    <div ref="cloud" class="cloud" />
    <svg width="0">
      <filter id="filter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency=".01"
          numOctaves="10"
        />
        <feDisplacementMap
          in="SourceGraphic"
          scale="240"
        />
      </filter>
    </svg>
  </div>
</template>

<script>
import cloudShadows from '@/utils/cloud'
import { isMobile } from '@/utils'

export default {
  data() {
    return {

    }
  },
  mounted() {
    this.update()
    !isMobile && window.addEventListener('click', this.update)
  },
  beforeDestroy() {
    !isMobile && window.removeEventListener('click', this.update)
  },
  methods: {
    update() {
      this.$nextTick(() => {
        this.$refs.cloud.style.boxShadow = cloudShadows(100)
      })
    }
  }

}
</script>

<style lang="scss" scoped>
  .cloud-wrap {
    position: fixed;
    height: 0;
  }
  .cloud {
    overflow: hidden;
    transform: translate(-100%, -100%);
    border-radius: 50%;
    filter: url(#filter);
  }
</style>
