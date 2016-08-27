import { graphql } from '../utils/http'

export default {
    userList() {
        return graphql(`{
        userList {
            id
            username
            avatar
        }
    }`)
    }
}