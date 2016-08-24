'use strict';

import {
    setErrConsumeFunction
} from './utils/Http'

import {
    getTestData,
    postTestData
} from './TestApis'

export default {
    Test: {
        getTestData,
        postTestData
    },
    Util: {
        setErrConsumeFunction
    }
}