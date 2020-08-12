<template>
  <div class="github-login">
    <div class="text">
      登陆中...
    </div>
  </div>
</template>

<script>
import { githubLogin } from '@/api/user'

export default {
  name: 'GithubLogin',
  data() {
    return {

    }
  },
  created() {
    this.getUserData(window.location.search.split('=')[1])
  },
  methods: {
    getUserData(code) {
      githubLogin({ code })
        .then(res => {
          window.localStorage.setItem('_login', JSON.stringify({
            date: +new Date(),
            data: res
          }))
        })
        .catch(e => {
          console.log('getUserData err', e)
          window.localStorage.setItem('_login', JSON.stringify({
            date: +new Date(),
            data: false
          }))
        })
        .finally(() => {
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
