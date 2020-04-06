<template>
  <transition name="fade">
    <div v-show="visible" class="dialog-mask" @click="handleCancel">
      <div class="dialog-main" @click.stop>
        <div v-if="title" class="dialog-title">
          {{ title }}
        </div>
        <div class="dialog-content">
          <slot />
        </div>
        <div class="dialog-footer">
          <button class="dialog-btn dialog-btn-cancel" @click="handleCancel">取 消</button>
          <button class="dialog-btn dialog-btn-confirm" @click="handleConfirm">确 认</button>
        </div>
      </div>
    </div>
  </transition>

</template>

<script>
export default {
  name: 'Dialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  },
  watch: {
    visible: {
      immediate: true,
      handler(val) {
        if (val) {
          document.body.style.overflow = 'hidden'
        } else {
          document.body.style.overflow = 'initial'
        }
      }
    }
  },
  methods: {
    handleCancel() {
      this.$emit('cancel')
    },
    handleConfirm() {
      this.$emit('confirm')
    }
  }

}
</script>

<style lang="less" scoped>
  .dialog-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.3);
    z-index: 999;
  }
  .dialog-main {
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    width: 40%;
    margin: 0 auto;
    border-radius: @radius-md;
    background-color: #fff;

    .dialog-title {
      height: 50px;
      line-height: 50px;
      font-size: 18px;
      font-weight: bold;
      letter-spacing: 0.1em;
      border-bottom: 1px solid @color-border-tint;
      color: @color-main;
    }
    .dialog-content {
      padding: 20px 10px;
    }

    .dialog-footer {
      padding: 10px 20px;
      text-align: right;
    }

    .dialog-btn {
      border-width: 1px; /*no*/
      border-style: solid;
      border-color: @color-border-tint;
      border-radius: @radius-md;
      padding: 6px 12px;
      font-size: @font-size-xs;
      cursor: pointer;
    }

    .dialog-btn-cancel {
      background-color: #fff;
      color: @color-base;
      &:hover {
        color: rgba(79,142,84,1);
        background-color: rgba(79,142,84,0.1);
      }
    }
    .dialog-btn-confirm {
      margin-left: 20px;
      color: #fff;
      background-color: rgba(79,142,84,1);
      &:hover {
        background-color: rgba(79,142,84,0.8);
      }
    }
  }
</style>
