<template>
  <transition name="message-fade" @after-leave="handleAfterLeave">
    <div
      v-show="visible"
      :class="[
        'my-message',
        type ? `my-message--${type}` : '',
        customClass
      ]"
      :style="positionStyle"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <svg-icon :icon-class="`msg-${type}`" class-name="my-message-icon" />
      <p class="my-message-content" v-html="message" />
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      message: '',
      duration: 3000,
      type: 'info',
      customClass: '',
      onClose: null,
      closed: false,
      verticalOffset: 20,
      timer: null
    }
  },
  computed: {
    positionStyle() {
      return {
        'top': `${this.verticalOffset}px`
      }
    }
  },
  watch: {
    closed(newVal) {
      if (newVal) {
        this.visible = false
      }
    }
  },
  mounted() {
    this.startTimer()
    document.addEventListener('keydown', this.keydown)
  },
  beforeDestroy() {
    document.removeEventListener('keydown', this.keydown)
  },
  methods: {
    handleAfterLeave() {
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },

    close() {
      this.closed = true
      if (typeof this.onClose === 'function') {
        this.onClose(this)
      }
    },

    clearTimer() {
      clearTimeout(this.timer)
    },

    startTimer() {
      if (this.duration > 0) {
        this.timer = setTimeout(() => {
          if (!this.closed) {
            this.close()
          }
        }, this.duration)
      }
    },

    keydown(e) {
      if (e.keyCode === 27) { // esc
        if (!this.closed) {
          this.close()
        }
      }
    }
  }
}
</script>

