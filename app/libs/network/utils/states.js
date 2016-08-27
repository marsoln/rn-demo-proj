/**
 * 网络请求的返回的状态码
 */
const STATES = {
    SUCCESS: 1, // 成功
    WARNING: 0, // 警告
    FAIL: 2,    // 逻辑失败
    UNAUTHENTICATED: 4001,  // 需要合法身份
    INTERNAL_ERR: 500,  // 内部错误
}

export default STATES