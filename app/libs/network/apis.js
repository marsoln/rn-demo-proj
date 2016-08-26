'use strict';

import {
    setErrConsumeFunction
} from './utils/http'

import UserApi from './bu/users'
import UserState from './bu/userState'

export default {
    UserApi,
    UserState,
    Util: {
        setErrConsumeFunction
    }
}