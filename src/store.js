import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLogin: false
  },
  mutations: {
    updateUserInfo(state, info) {
      state.userInfo = info;
    },
    changeIsLogin(state, isLogin) {
      state.isLogin = isLogin;
    }
  },
  actions: {

  }
})
