'use strict';

import {
    SERVER,
    setErrConsumeFunction
} from './utils/http'
import STATES from './utils/states'
import UserApi from './bu/users'
import UserState from './bu/userState'
import CurrentUser from './utils/currentUser'

export default {
    SERVER,
    UserApi,
    CurrentUser,
    UserState,
    STATES,
    Util: {
        setErrConsumeFunction
    },
}