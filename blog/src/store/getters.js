const getters = {
  /* app */
  isNavShow: state => state.app.isNavShow,
  isLoginModalShow: state => state.app.isLoginModalShow,
  isSmallScreen: state => state.app.isSmallScreen,
  /* user */
  token: state => state.user.token,
  userInfo: state => state.user.userInfo,
  isLogin: state => state.user.isLogin
}

export default getters
