'use strict';

import { graphql } from '../utils/http'

export function userList() {
    return graphql(`{
        userList{
            nickname
        }
    }`)
}