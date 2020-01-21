<template>
  <div class="github-login">
    <div class="text">
      登陆中...
    </div>
  </div>
</template>

<script>
import { api_user } from '@/api'

export default {
  name: 'GithubLogin',
  data() {
    return {

    }
  },
  created() {
    // this.getUserData(this.$route.query.code)
    this.getUserData(window.location.search.split('=')[1])
  },
  methods: {
    getUserData(code) {
      console.log(code)
      api_user.getInfo({ code })
        .then(res => {
          window.localStorage.setItem('_login', JSON.stringify({
            date: +new Date(),
            data: res
          }))
          window.close()
        })
    }
  }
}
</script>

<style lang="less" rel="stylesheet/less">
  .github-login {
    text-align: center;
    .text {
      margin: 40px;
      font-size: @font-size-sm;
      color: @color-main;
    }
  }
</style>
