
const state = {
  isNavShow: false,
  isSmallScreen: false,
  isLogiDialogShow: false
}

const mutations = {
  UPDATE_IS_SMALL_SCREEN(state, isSmallScreen) {
    state.isSmallScreen = isSmallScreen
  },
  UPDATE_IS_NAV_SHOW(state, isNavShow) {
    state.isNavShow = isNavShow
  },
  UPDATE_IS_LOGIN_DIALOG_SHOW(state, isShow) {
    state.isLogiDialogShow = isShow
  }
}

const actions = {
  updateIsSmallScreen({ commit }, isSmallScreen) {
    commit('UPDATE_IS_SMALL_SCREEN', isSmallScreen)
  },
  updateIsNavShow({ commit }, isNavShow) {
    commit('UPDATE_IS_NAV_SHOW', isNavShow)
  },
  updateIsLoginDialogShow({ commit }, isShow) {
    commit('UPDATE_IS_LOGIN_DIALOG_SHOW', isShow)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
