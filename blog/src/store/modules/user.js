import { getToken, setToken, removeToken } from '@/utils/auth'
import { getUserInfo } from '@/api/user'

const state = {
  isLogin: !!getToken(),
  userInfo: {}
}

const mutations = {
  UPDATE_USER_INFO(state, info) {
    state.userInfo = info
  },
  UPDATE_IS_LOGIN(state, isLogin) {
    state.isLogin = isLogin
  }
}

const actions = {
  updateUserInfo({ commit }, info) {
    commit('UPDATE_USER_INFO', info)
  },
  updateIsLogin({ commit }, isLogin) {
    commit('UPDATE_IS_LOGIN', isLogin)
  },
  /* 处理 github 登陆后的消息 */
  githubLogin({ commit }, data) {
    const { token, userInfo } = data

    commit('UPDATE_USER_INFO', userInfo)

    setToken(token)
    commit('UPDATE_IS_LOGIN', true)

    return Promise.resolve()
  },
  getUserInfo({ commit }, data) {
    return new Promise((resolve, reject) => {
      getUserInfo()
        .then(res => {
          commit('UPDATE_USER_INFO', res)
          resolve()
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  logout({ commit }) {
    removeToken()
    commit('UPDATE_IS_LOGIN', false)
    commit('UPDATE_USER_INFO', {})
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
