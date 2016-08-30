import { graphql } from '../utils/http'

export default {
    userList() {
        return graphql(`{ userList { id,username,avatar } }`)
    },
    userProfile(id) {
        return graphql(`{ user(id:"${id}"){ age,gender,city,hometown,phone,email,birthday,address } }`)
    }
}