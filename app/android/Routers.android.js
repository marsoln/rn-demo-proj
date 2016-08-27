import React, {
    AppRegistry,
    View,
    BackAndroid,
    Navigator,
    Alert,
    Text,
    AppState,
} from '../libs/system/react'
import apis from '../libs/network/apis.js'
import MainTabView from './view/common/MainTabView'
import Loading from './view/common/Loading'
import Login from './view/user/Login'
import Register from './view/user/Register'
import Toast from  'react-native-toast'

const EXIT_DELAY = 3000    // 双击退出客户端的相应延迟
let _navigator, _quitStatus = false

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
            '未知错误', [
                { text: 'OK' }
            ]
        )
    }
})

// 监听系统后退按钮
BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator.getCurrentRoutes().length === 1) {
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
    }
})

export default class AndroidRouters extends React.Component {

    constructor(props) {
        super(props)
        this.state = { type: 0, currentAppState: "" }
    }

    renderScene(route, navigator) {
        _navigator = navigator;
        switch (route.id) {
            case 'MainTabView':
                return (<View style = { { flex: 1 } }>
                    <MainTabView nav = { navigator }
                        type = { route.type }
                        selectedTab = { route.selectedTab }
                        />
                </View>)
            case 'Loading':
                return (<Loading nav={ navigator } />)
            case 'Login':
                return (<Login nav={navigator} />)
            case 'Register':
                return (<Register nav={navigator} />)
        }
    }

    render() {
        return (<Navigator ref = "navigator"
            initialRoute = {
                { id: 'Loading' }
            }
            configureScene = {
                () => Navigator.SceneConfigs.FadeAndroid
            }
            renderScene = { this.renderScene } />
        )
    }

    onReceiveMessage(message) { }

    onOpenMessage(message) { }
}
