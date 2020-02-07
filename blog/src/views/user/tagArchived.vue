<template>
  <div>
    <timeLine :time-line-name="tag" api-name="tag" :para="para" />
  </div>
</template>

<script>
import timeLine from '@/components/timeLine/timeLine'
export default {
  name: 'TagArchived',
  components: {
    timeLine
  },
  data() {
    return {
      tag: '',
      para: {}
    }
  },
  created() {
    this.tag = this.$route.params.tag
    this.resetData()
  },
  activated() {
    this.tag = this.$route.params.tag
    this.resetData()
  },
  methods: {
    resetData() {
      this.$set(this.para, 'tag', this.tag)
    }
  }
}
</script>

