import { graphql } from '../utils/http'
import currentUser from '../utils/currentUser'

export default {
    userList() {
        return graphql(`{ userList { id,username,avatar } }`)
    },
    userProfile(id) {
        return graphql(`{ user(id:"${id}"){ age,gender,city,hometown,phone,email,birthday,address,gender } }`)
    },
    /**
     * 编辑个人信息
     * @param {Object} terms 编辑的条目
     */
    updateUserProfile(terms) {
        let user = currentUser.getCurrentUser()
        // return `mutation { updateUserProfile(id:"${user && user['id']}",terms:"${JSON.stringify(terms)}") }`
        return graphql(`mutation { updateUserProfile(id: "${user && user['id']}",terms:"{\"age\":28}") }`)

        // return graphql(`mutation { updateUserProfile(id:"${user && user['id']}",terms:"${JSON.stringify(terms)}") }`)
    }
}