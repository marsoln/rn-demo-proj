'use strict';

import { getData, postData } from './utils/Http';

export function getTestData() {
    return getData('getTest');
}
export function postTestData(params) {
    return postData('postTest', params)
}