import { getToken, setToken, removeToken, encryption } from '@/utils/auth'
import { A_login } from '@/api/user'

const state = {
  isLogin: !!getToken(),
  userInfo: {

  }
}

const mutations = {
  UPDATE_IS_LOGIN(state, isLogin) {
    state.isLogin = isLogin
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo

    console.log(userInfo)
    const login_info = encryption({
      data: {
        username,
        password
      },
      param: ['password']
    })
    console.log(login_info)
    return new Promise((resolve, reject) => {
      A_login(login_info)
        .then(response => {
          commit('UPDATE_IS_LOGIN', true)
          setToken(response.access_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
