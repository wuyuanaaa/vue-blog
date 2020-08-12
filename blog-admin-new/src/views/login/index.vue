<template>
  <div class="page">
    <div class="login">
      <h2 class="login-title">后台登陆</h2>
      <el-form
        ref="form"
        class="login-form"
        :model="formData"
        :rules="rules"
        label-width="auto"
        label-suffix="："
        :hide-required-asterisk="true"
      >
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="formData.username"
            clearable
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="formData.password"
            type="password"
            show-password
          />
        </el-form-item>
      </el-form>
      <el-button
        type="primary"
        class="login-submit"
        :loading="loading"
        @click="handleLogin"
      >登 陆</el-button>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      loading: false,
      formData: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '用户名不能为空', trgger: 'no' }
        ],
        password: [
          { required: true, message: '密码不能为空', trgger: 'no' }
        ]
      }
    }
  },
  methods: {
    handleLogin() {
      this.loading = true
      this.$refs['form'].validate()
        .then(() => {
          return this.$store.dispatch('user/login', this.formData)
        })
        .then(res => {
          console.log(res)
        })
        .catch(e => {
          console.log('login err', e)
        })
        .finally(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  .page {
    display: flex;
    height: 100%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .login {
    padding: 20px;
    width: 360px;
    background: rgba(255,255,255,0.4);
    border-radius: 5px;
    .login-title {
      text-align: center;
      margin-bottom: 30px;
    }
    .login-submit {
      margin-top: 20px;
      width: 100%;
    }
  }
</style>
