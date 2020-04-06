<template>
  <div class="textarea-wrap">
    <textarea ref="main" class="textarea-main textarea-area" name="" rows="1" :placeholder="placeholder" :value="value" @input="handlerInput" @focus="handlerFocus" />
    <div ref="holder" class="textarea-main textarea-holder" v-text="holderValue" />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    autofocus: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    holderValue() {
      return this.value.replace(/\n/g, '\n ')
    }
  },
  mounted() {
    if (this.autofocus) {
      this.$nextTick(() => {
        this.$refs['main'].focus()
      })
    }
  },
  methods: {
    handlerInput(e) {
      this.$emit('input', e.target.value)
    },
    handlerFocus() {
      this.$emit('on-focus')
    }
  }
}
</script>

<style lang="less" scoped>
.textarea-wrap {
  position: relative;
  min-height: 34px;
}

.textarea-main {
  width: 100%;
  height: 100%;
  padding: 5px 6px;
  line-height: 24px;
  font-size: @font-size-xs;
  border-radius: @radius-md;
  border-width: 1px; /*no*/
  border-style: solid;
  border-color: @color-border-tint;
  outline: none;
  overflow: hidden;
  &:hover {
    border-color: @color-main;
  }
  &:focus {
    border-color: @color-main;
  }

  &::placeholder {
    color: @color-tint;
  }
}
.textarea-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  resize: none;
}
.textarea-holder {
  padding-left: 4px;
  white-space: pre-wrap;
  word-wrap: break-word;
  word-break: break-all;
  z-index: -1;
}
</style>
