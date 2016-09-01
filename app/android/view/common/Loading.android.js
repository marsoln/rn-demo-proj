import React, {
    Alert,
    Easing,
    View,
    Text,
    Animated,
    NetInfo,
    StatusBar,
} from '../../../libs/system/react'

import apis from '../../../libs/network/apis'
import {WINDOW_WIDTH, WINDOW_HEIGHT} from '../styles/basic'

export default class Loading extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fadeAnim: new Animated.Value(0)
        }
    }

    naviTo(callback) {
        setTimeout(() => {
            Animated
                .timing(this.state.fadeAnim, {
                    toValue: 0,
                    duration: 1000,
                    easing: Easing.inOut(Easing.ease)
                })
                .start()
            setTimeout(callback, 1200)
        }, 1200);
    }

    componentDidMount() {
        NetInfo
            .fetch()
            .done((reach) => {
                if (reach == "NONE") {
                    Alert.alert(
                        'Woops',
                        '亲,你好像断网了..',
                        [
                            { text: 'OK' }
                        ]
                    )
                } else {
                    apis
                        .UserState
                        .checkLoginState()
                        .then((resData) => {
                            debugger
                            if (resData.type == 1) {
                                //正常登录
                                this.naviTo(() => {
                                    this.props.nav.immediatelyResetRouteStack([
                                        { id: 'MainTabView', type: this.props.type == null ? 0 : this.props.type }
                                    ])
                                })
                            }
                            else {
                                //账号未登录
                                this.naviTo(() => {
                                    this.props.nav.immediatelyResetRouteStack([
                                        { id: 'Login' }
                                    ])
                                })
                            }
                        })
                }
            })

        Animated
            .timing(this.state.fadeAnim, {
                toValue: 1,
                duration: 1000,
            })
            .start()
    }

    render() {
        return (
            <View>
                <StatusBar hidden ={true} />
                <Animated.Image
                    resizeMode="cover"
                    source={ Math.random() > 0.5 ? require('../../../assets/images/loading.jpg') : require('../../../assets/images/loading1.png') }
                    style={{
                        flex: 1,
                        opacity: this.state.fadeAnim,
                        width: WINDOW_WIDTH,
                        height: WINDOW_HEIGHT,
                    }}
                    />
            </View>
        )
    }
}