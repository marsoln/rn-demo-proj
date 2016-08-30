/**
 * 维持当前用户的信息状态
 */
let currentLoginUser = null

export default {
  /**
   * 获取当前登录用户信息
   * @returns {*}
   */
  getCurrentUser() {
    return currentLoginUser
  },

  /**
   * 注销当前用户
   */
  clearCurrentUser() {
    currentLoginUser = null
  },

  /**
   * 设置当前用户信息
   * @param user 用户信息
   */
  setCurrentUser(user) {
    debugger
    currentLoginUser = user
    currentLoginUser.name = user.username
    Object.freeze(currentLoginUser)
  },

  /**
   * 获取当前用户ID
   * @returns {*}
   */
  getCurrentUserId() {
    return currentLoginUser && currentLoginUser['id']
  }

}