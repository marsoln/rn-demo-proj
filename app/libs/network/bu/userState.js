import { getData, postData, postFormData, graphql } from '../utils/http'
import { setCurrentUser, clearCurrentUser } from '../utils/currentUser'
import STATES from '../utils/states'

export default {
    /**
     * 检查登录状态
     */
    checkLoginState() {
        return getData(`login/state`)
            .then(res => {
                if (res.type == STATES.SUCCESS && !!res.data) {
                    //当用户正常登录时 更新currentUser缓存
                    setCurrentUser(res.data)
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
        return postData(`login/`, {
            username: username,
            password: password
        }).then(res => {
            if (res.type == 1) {
                setCurrentUser(res.data) // 更新缓存中当前用户对象
            } else {
                clearCurrentUser() // 清空缓存的当前用户对象
            }
            return res
        })
    },

    /**
     * 用户注册
     * @param {string} username 用户名
     * @param {string} password 密码
     */
    register(username, password) {
        return postData(`register`, {
            username: username,
            password: password
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
            username: username,
            password: password
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
        clearCurrentUser()
        return getData(`logout`)
    }
}