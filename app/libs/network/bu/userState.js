import { getData, postData, postFormData, graphql } from '../utils/http'
import currentUser from '../utils/currentUser'
import DB from 'react-native-store'
import STATES from '../utils/states'

let updateLastLoginUser = (username, password) => {
    let account = DB.model('account')
    let _where = { where: { state: 'last_login_user' } }
    let _model = { username, password, state: 'last_login_user' }
    account
        .find(_where)
        .then(res => {
            if (res) {
                account.update(_model, _where)
            } else {
                account.add(_model)
            }
        }) // 记录用户名密码
}

export default {
    /**
     * 检查登录状态
     */
    checkLoginState() {
        return getData(`login/state`)
            .then(res => {
                if (res.type == STATES.SUCCESS && !!res.data) {
                    //当用户正常登录时 更新currentUser缓存
                    currentUser.setCurrentUser(res.data)
                }
                return res
            })
    },

    /**
     * 用户登录
     * @param {string} username 用户名
     * @param {string} password 密码
     */
    login(username, password) {
        return postData(`login`, {
            username: username,
            password: password
        }).then(res => {
            if (res.type == STATES.SUCCESS) {    // 登录成功
                currentUser.setCurrentUser(res.data) // 更新缓存中当前用户对象
                updateLastLoginUser(username, password)
            } else {
                currentUser.clearCurrentUser() // 清空缓存的当前用户对象
            }
            return res
        })
    },

    /**
     * 用户注册
     * @param {string} username 用户名
     * @param {string} password 密码
     * @param {string} confirmpwd 确认密码
     */
    register(username, password, confirmpwd) {
        return postData(`register`, {
            username,
            password,
            confirmpwd
        }).then(res => {
            if (res.type == STATES.SUCCESS) {    // 登录成功
                currentUser.setCurrentUser(res.data) // 更新缓存中当前用户对象
                updateLastLoginUser(username, password)
            } else {
                currentUser.clearCurrentUser() // 清空缓存的当前用户对象
            }
            return res
        })
    },

    /**
     * 找回密码
     * @param username 用户名
     * @param password 密码
     * @returns {Promise.<T>}
     */
    findPassword(username, password) {
        return postData(`findPassword`, {
            username,
            password
        })
    },

    /**
     * 更新头像
     * @param avatarObj 更新的图片对象
     * @returns {*}
     */
    updateAvatar(avatarObj) {
        return postFormData(`updateAvatar`, avatarObj)
    },

    /**
     * 登出当前用户
     */
    logout() {
        currentUser.clearCurrentUser()
        return getData(`logout`)
    }
}