import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    isLogin: false,
    isLoginModalShow: false,
    isNavShow: false,
    isSmallScreen: false
  },
  mutations: {
    UPDATE_USER_INFO(state, info) {
      state.userInfo = info
    },
    UPDATE_ISLOGIN(state, isLogin) {
      state.isLogin = isLogin
    },
    UPDATE_ISLOGINMODALSHOW(state, isShow) {
      state.isLoginModalShow = isShow
    },
    UPDATE_ISSMALLSCREEN(state, isSmallScreen) {
      state.isSmallScreen = isSmallScreen
    },
    UPDATE_ISNAVSHOW(state, isNavShow) {
      state.isNavShow = isNavShow
    }
  },
  actions: {
    updateUserInfo({ commit }, info) {
      commit('UPDATE_USER_INFO', info)
    },
    updateIsLogin({ commit }, isLogin) {
      commit('UPDATE_ISLOGIN', isLogin)
    },
    uodateIsLoginModalShow({ commit }, isShow) {
      commit('UPDATE_ISLOGINMODALSHOW', isShow)
    },
    updateIsSmallScreen({ commit }, isSmallScreen) {
      commit('UPDATE_ISSMALLSCREEN', isSmallScreen)
    },
    updateIsNavShow({ commit }, isNavShow) {
      commit('UPDATE_ISNAVSHOW', isNavShow)
    }
  }
})
