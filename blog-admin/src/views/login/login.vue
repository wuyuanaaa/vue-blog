<template>
  <div class="login-wrapper">
    <h2 class="login-title">管理后台登陆</h2>
    <Form ref="formInline" :model="formInline" :rules="ruleInline">
      <FormItem prop="user">
        <Input class="login-input" type="text" v-model="formInline.user" placeholder="用户名">
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem prop="password">
        <Input class="login-input" type="password" v-model="formInline.password" placeholder="密码">
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </Input>
      </FormItem>
      <FormItem>
        <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>

  export default {
    name: "login",
    data() {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            {required: true, message: '输入用户名', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '输入密码', trigger: 'blur'},
            {type: 'string', min: 6, message: '密码不能小于6位', trigger: 'blur'}
          ]
        }
      }
    },
    created () {
      let _this = this;
      document.onkeydown = e => {
        e = e || window.event;
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
          _this.handleSubmit('formInline');
        }
      };

      this.$axios.get('users/checkLogin')
        .then(res => {
          if (res.status === '0') {
            this.$router.replace({path: '/admin'})
          }
        })
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.login();
          } else {
            this.$Message.error('格式错误!');
          }
        })
      },
      login() {
        this.$axios.post("users/login", {
          userName: this.formInline.user,
          userPwd: this.formInline.password
        }).then(res => {
          if (res.status === '0') {
            this.$Message.success('登录成功!');
            // this.$store.commit("updateUserInfo", res.result.userName);
            this.$router.replace({path: '/admin'})
          } else {
            this.$Message.error('登录失败!' + res.msg);
          }
        })
      }
    },
    beforeDestroy() {
      document.onkeydown = Function.prototype;
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .login-wrapper {
    box-sizing: border-box;
    position: absolute;
    top: 100px;
    left: 50%;
    padding: 40px 40px;
    width: 500px;
    height: 300px;
    border-radius: 4px;
    margin-left: -250px;
    box-shadow: 0 0 10px #ccc;
    .login-title {
      margin-bottom: 40px;
    }
    .login-input {
      margin: 0 auto;
    }
  }
</style>
