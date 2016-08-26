import { getData, postData, postFormData } from '../utils/http'
import { setCurrentUser, clearCurrentUser } from '../utils/currentUser'


/**
 * 检查登录状态
 * -----------
 * Type如下
 * 0 - 账号未登录
 * 1 - 正常登录
 * 2 - 用户未登录
 */
export function checkLoginState() {
  return getData(`CheckLoginState`).then(res=> {
    if (res.Type == 1 && !!res.Data) {
      //当用户正常登录时 更新currentUser缓存
      setCurrentUser(res.Data)
    }
    return res
  })
}

/**
 * 用户登录
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export function userLogin(username, password) {
    return postData('Userlogin', {
        username: username,
        password: password
    }).then(res => {
        if (res.Type == 1) {
            setCurrentUser(res.Data) // 更新缓存中当前用户对象
        } else {
            clearCurrentUser() // 清空缓存的当前用户对象
        }
        return res
    })
}

/**
 * 用户注册
 * @param {string} username 用户名
 * @param {string} password 密码
 */
export function userRegister(username, password) {
    return postData('UserRegister', {
        username: username,
        password: password
    })
}

/**
 * 找回密码
 * @param username 用户名
 * @param password 密码
 * @returns {Promise.<T>}
 */
export function findPassword(username, password) {
    return postData('FindPassword', {
        username: username,
        password: password
    })
}

/**
 * 更新头像
 * @param avatarObj 更新的图片对象
 * @returns {*}
 */
export function updateAvatar(avatarObj) {
    return postFormData('UpdateAvatar', avatarObj)
}

/**
 * 登出当前用户
 */
export function logout() {
    clearCurrentUser()
    return postData('Logout')
}
