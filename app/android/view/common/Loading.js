import React, {
    View,
    Text,
    Animated,
    NetInfo,
} from '../../../libs/system/react'

import apis from '../../../libs/network/apis'

export default class Loading extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fadeAnim: new Animated.Value(0)
        }
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
                            if (resData.Type == 1) {
                                //正常登录
                                setTimeout(() => { this.props.nav.immediatelyResetRouteStack([{ id: 'MainTabView', type: this.props.type == null ? 0 : this.props.type }]); }, 1000);
                            }
                            else if (resData.Type == 2) {
                                //用户未登录
                                setTimeout(() => { this.props.nav.immediatelyResetRouteStack([{ id: 'SelectCompany' }]); }, 1000);
                            }
                            else {
                                //账号未登录
                                setTimeout(() => { this.props.nav.immediatelyResetRouteStack([{ id: 'Login' }]); }, 1000);
                            }
                        })
                }
            })

        Animated
            .timing(this.state.fadeAnim, { toValue: 1 })
            .start()
    }

    render() {
        return (<View>
            <Text>loading</Text>
        </View>)
    }
}