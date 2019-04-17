<template>
  <div class="github-login">
    <div class="text">
      登陆中...即将返回当前页面。
    </div>
  </div>
</template>

<script>
  export default {
    name: "github_login",
    data() {
      return {

      }
    },
    created() {
      this.getUserData(this.$route.query.code);
    },
    methods: {
      getUserData(code) {
        this.$axios.get('users/github',{code: code})
          .then(res => {
            if (res.status === '0') {
              window.localStorage.setItem('_login',JSON.stringify({
                date: +new Date(),
                data: res.result
              }));
              let lastPage = window.localStorage.getItem('_lastPage');
              if (lastPage) {
                window.location.href = lastPage;
              } else {
                this.$router.replace({path: '/home'})
              }
            }
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
