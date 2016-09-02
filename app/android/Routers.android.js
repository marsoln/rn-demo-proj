import React, {
    AppRegistry,
    AppState,
    BackAndroid,
    Navigator,
    Text,
    View,
    StatusBar,
} from '../libs/system/react'
import apis from '../libs/network/apis.js'
import MainTabView from './view/common/MainTabView'
import Loading from './view/common/Loading'
import Login from './view/user/Login'
import Register from './view/user/Register'
import Toast from  'react-native-toast'
import ErrorHandlerRegister from './ErrorHandler'

const EXIT_DELAY = 3000    // 双击退出客户端的相应延迟
let _navigator, _quitStatus = false

ErrorHandlerRegister()

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
                return (
                    <MainTabView nav = { navigator }
                        type = { route.type }
                        selectedTab = { route.selectedTab }
                        />
                )
            case 'Loading':
                return (<Loading nav={ navigator } />)
            case 'Login':
                return (<Login nav={navigator} />)
            case 'Register':
                return (<Register nav={navigator} />)
        }
    }

    render() {
        return (
            <Navigator ref = "navigator"
                initialRoute = { { id: 'Loading' } }
                configureScene = { () => Navigator.SceneConfigs.FadeAndroid }
                renderScene = { this.renderScene } />
        )
    }

    onReceiveMessage(message) { }

    onOpenMessage(message) { }
}
