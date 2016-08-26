'use strict';

import React from 'react'
import { AppRegistry, View, BackAndroid, Navigator, Text, Alert, ToastAndroid, AppState } from 'react-native'
import apis from '../libs/network/apis.js'
import MainTabView from './view/common/MainTabView'
import Loading from './view/common/Loading'

const EXIT_DELAY = 3000    // 双击退出客户端的相应延迟
let _navigator, _quitStatus = false

// 页面路由的映射配置
module.exports = React.createClass({
    getInitialState: function () {
        return { type: 0, currentAppState: "" }
    },
    componentDidMount() {

    },
    componentWillUnmount() {
    },
    renderScene: function (route, navigator) {
        _navigator = navigator;
        switch (route.id) {
            case 'MainTabView':
                return (<View style = { { flex: 1 } }>
                    <MainTabView nav = { navigator }
                        type = { route.type }
                        selectedTab = { route.selectedTab }
                        />
                </View >)
            case 'Loading':
                return (<Loading nav={ navigator } />)
        }
    },
    render: function () {

        return (<Navigator ref = "navigator"
            initialRoute = {
                { id: 'Loading' }
            }
            configureScene = {
                () => Navigator.SceneConfigs.FadeAndroid
            }
            renderScene = { this.renderScene } />
        );

    },
    onReceiveMessage(message) {

    },

    onOpenMessage(message) { }
})


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
                err, [
                    { text: 'OK' }
                ]
            )
        }
    } else if (err instanceof SyntaxError) {
        Alert.alert(
            '警告',
            '呀！！不小心网络出问题了', [
                { text: 'OK' }
            ]
        )
    } else {
        Alert.alert(
            '警告',
            err, [
                { text: 'OK' }
            ]
        )
    }
})

// 监听系统后退按钮
BackAndroid.addEventListener('hardwareBackPress', () => {
    if (_navigator.getCurrentRoutes().length === 1) {
        if (_quitStatus) {
            return false;
        } else {
            ToastAndroid.show("再按一次返回键退出客户端", ToastAndroid.SHORT)
            _quitStatus = true
            setTimeout(() => {
                _quitStatus = false
            }, EXIT_DELAY)
            return true
        }
    }
})
