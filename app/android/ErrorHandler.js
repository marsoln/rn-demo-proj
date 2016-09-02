import React, {
    Alert,
} from '../libs/system/react'
import apis from '../libs/network/apis.js'

export default function () {
    // 注册网络请求错误的handler
    apis.Util.setErrConsumeFunction(err => {
        if (err instanceof TypeError) {
            if (err.message == "Network request failed") {
                //网络问题 连接不到服务器
                Alert.alert(
                    '警告',
                    '请检查你的网络情况！', [
                        { text: 'OK' }
                    ]
                )
            } else {
                Alert.alert(
                    '警告',
                    '类型错误', [
                        { text: 'OK' }
                    ]
                )
            }
        } else if (err instanceof SyntaxError) {
            Alert.alert(
                '警告',
                '语法错误', [
                    { text: 'OK' }
                ]
            )
        } else if (err.type == apis.STATES.UNAUTHENTICATED) {
            Alert.alert(
                '警告',
                '身份信息过期,请重新登录', [
                    { text: 'OK' }
                ]
            )
        } else {
            Alert.alert(
                '警告',
                err.message, [
                    { text: 'OK' }
                ]
            )
        }
    })
}