import { Platform } from 'react-native'
import STATES from './states'

// const SERVER = 'http://192.168.1.3'
const SERVER = 'http://172.26.9.137'
const MOBILE_API = `${SERVER}`
const GRAPHQL_API = `${SERVER}/graphql`
const DEFAULT_HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'os': Platform.OS
}

exports.SERVER = SERVER

/**
 * 构建表单数据对象
 * @param params 表单参数
 * @returns {*} 构建后的FormData对象
 */
var createFormData = function (params) {
    var data = new FormData()
    //我们需要将FormData里的数组和特殊对象扁平处理
    var flattenFormData = function (args, formDataObj) {
        for (let key in args) {
            //将参数附加到表单中
            if (args.hasOwnProperty(key) && args[key] !== null && args[key] !== undefined) {
                //图片特殊处理
                if (key.toLowerCase() === 'files' && null != args[key] && args[key] !== undefined) {
                    var files = args[key]
                    for (let i = 0; i < files.length; i++) {
                        formDataObj.append('Files', {
                            uri: files[i]['uri'],
                            name: files[i]['name'],
                            type: 'application/octet-stream'
                        })
                    }
                }
                /*
                 判断是否是数组对象
                 如果是数组 不可以直接作为FormData项提交
                 需要FormData append的value必须是基本对象
                 */
                else if (Array.isArray(args[key])) {
                    var arr = args[key]
                    for (let i = 0; i < arr.length; i++) {
                        if (null != arr[i] && arr[i] !== undefined) {
                            flattenFormData({
                                [key]: arr[i]
                            }, formDataObj)
                        }
                    }
                }
                // 复杂对象
                else if (typeof args[key] == "object") {
                    flattenFormData(args[key], formDataObj)
                }
                // 简单对象 String/Number/Boolean
                else {
                    formDataObj.append(key, args[key])
                }
            }
        }
    }
    flattenFormData(params, data)
    return data
}
var errConsumer, errQueue = []

/**
 * 尝试消费错误,如果没有指定消费函数,则加入队列
 * @param err
 */
var tryConsumeErr = function (err) {
    if (!!errConsumer && typeof errConsumer === 'function') {
        if (err) {
            errConsumer(err)
        } else if (errQueue.length > 0) {
            errQueue.map(errConsumer)
        }
    } else {
        errQueue[errQueue.length] = err
    }
}

/**
 * 设置错误队列消费函数,唯一
 * @param consumeFunc
 */
export function setErrConsumeFunction(consumeFunc) {
    errConsumer = consumeFunc
    tryConsumeErr()
}

/**
 * 发送get请求
 * @param {string} action action地址
 * @returns {Promise.<T>}
 */
export function getData(action) {
    return fetch(`${MOBILE_API}/${action}`, {
        method: 'GET',
        headers: DEFAULT_HEADERS
    })
        .then((res) => res.json())
        .catch(err => {
            tryConsumeErr(err)
        })
}

/**
 * 发送post请求
 * @param {string} action action地址
 * @param {object} params 参数
 * @returns {Promise.<T>} ?
 */
export function postData(action, params) {
    for (let key in params) {
        //将参数附加到表单中
        if (params[key] === null || params[key] === undefined) {
            delete params[key]
        }
    }
    return fetch(`${MOBILE_API}/${action}`, {
        method: 'POST',
        headers: DEFAULT_HEADERS,
        body: JSON.stringify(params)
    })
        .then((res) => res.json())
        .catch(err => {
            tryConsumeErr(err)
        })
}

/**
 * post提交表单
 * @param action 提交地址
 * @param formParams 表单参数
 */
export function postFormData(action, formParams) {
    var _formData = createFormData(formParams)
    return fetch(`${MOBILE_API}/${action}`, {
        method: 'POST',
        headers: Object.assign({}, DEFAULT_HEADERS, {
            'Content-Type': 'multipart/form-data'
        }),
        body: _formData
    })
        .then(res => res.json())
        .catch(err => {
            tryConsumeErr(err)
        })
}

/**
 * graphql 查询
 * @param {string} query 查询语句
 * @param {object} varibles 变量
 * @param {string} operationName 操作类型名称
 */
export function graphql(query, varibles, operationName) {
    return new Promise((resolve, reject) => {
        fetch(GRAPHQL_API, {
            method: 'POST',
            headers: DEFAULT_HEADERS,
            "Content-Type": 'application/graphql',
            body: JSON.stringify({
                query: query,
                varibles: varibles || null,
                operationName: operationName || null,
            }, (k, v) => {
                if (typeof v === 'string') {
                    return v.replace(/(\s+|\n) /g, ' ')
                }
                return v
            })
        })
            .then(res => res.json())
            .then(res => {
                if (res.type == STATES.UNAUTHENTICATED || res.type == STATES.INTERNAL_ERR) {
                    reject(res['data']) // 业务逻辑的错误交给业务模块处理
                } else {
                    resolve(res['data'])
                }
            })
            .catch(err => {
                tryConsumeErr(err)  // 请求异常交给系统注册的errorHandler处理
            })
    })
}