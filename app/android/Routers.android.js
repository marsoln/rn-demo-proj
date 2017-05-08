import React, {
    AppRegistry,
    AppState,
    BackHandler,
    Text,
    View,
    StatusBar,
} from '../libs/system/react'
import {
    StackNavigator
} from 'react-navigation'
import apis from '../libs/network/apis.js'
import MainTabView from './view/common/MainTabView'
import Loading from './view/common/Loading'
import Login from './view/user/Login'
import Register from './view/user/Register'
import Toast from 'react-native-toast'
import ErrorHandlerRegister from './ErrorHandler'

const EXIT_DELAY = 3000    // 双击退出客户端的相应延迟
let _quitStatus = false

ErrorHandlerRegister()

const AppNav = StackNavigator(
    {
        Main: {
            screen: MainTabView
        },
        Loading: {
            screen: Loading
        },
        Login: {
            screen: Login
        },
        Register: {
            screen: Register
        }
    }, {
        initialRouteName: 'Loading',
        headerMode: 'none'
    }
)


// 监听系统后退按钮
BackHandler.addEventListener('hardwareBackPress', () => {
    if (_quitStatus) {
        return false
    } else {
        Toast.show("再按一次返回键退出客户端", 'short')
        _quitStatus = true
        setTimeout(() => {
            _quitStatus = false
        }, EXIT_DELAY)
        return true
    }
})

export default AppNav
