export default {
  namespaced: true,
  state: {
    userMessage: {
      username: '',
      userTypeName: "",
      userType: "",
    },
    token:""
  },
  mutations: {
    //登录保存用户信息
    updateUserInfo (state, val) {
      state.userMessage = val
    },
    //登录保存token
    updateToken (state, val) {
      state.token = val
    },
    //退出登录，清除登录信息
    deleUser(state, val) {
      // state.userMessage = val
      // state.token = ''
    },
  },
  action: {

  },
  modules: {
  }
}
