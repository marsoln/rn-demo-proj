'use strict';

import {
    SERVER,
    setErrConsumeFunction
} from './utils/http'
import STATES from './utils/states'
import UserApi from './bu/users'
import UserState from './bu/userState'

export default {
    SERVER,
    UserApi,
    UserState,
    STATES,
    Util: {
        setErrConsumeFunction
    },
}