import React, {
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity,
} from '../../../libs/system/react'

import apis from '../../../libs/network/apis'
import styles from '../styles/loginAndRegister'
import basicStyles from '../styles/basic'
import FadeInContainer from '../components/FadeInContainer'
import Toast from  'react-native-toast'

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: 'bobo',
            password: '123',
            unsubmit: true  // 是否未提交
        }
    }

    gotoRegister() {
        this.props.nav.immediatelyResetRouteStack([{ id: 'Register' }])
    }

    validate() {
        if (this.state.username === '') {
            Toast.show('请填写用户名', 'short')
            return false
        }
        if (this.state.password === '') {
            Toast.show('请填写密码', 'short')
            return false
        }
        return true
    }

    loginSubmit() {
        if (this.state.unsubmit && this.validate()) {
            apis
                .UserState
                .login(this.state.username, this.state.password)
                .then((res) => {
                    this.state.unsubmit = true
                    if (res.type == 1) {
                        this.props.nav.immediatelyResetRouteStack([
                            {
                                id: 'MainTabView',
                                type: this.props.type == null ? 0 : this.props.type
                            }
                        ])
                    } else {
                        Toast.show(res.data, 'short')
                    }
                })
            this.state.unsubmit = false
        }
    }

    renderContent() {
        return () => {
            return (
                <View style={basicStyles.container}>
                    <Text style={styles.header}>登录</Text>
                    <View>
                        <TextInput
                            style={basicStyles.lineInput}
                            placeholder="用户名"
                            value="bobo"
                            onChangeText={(text) => this.setState({ username: text }) }/>
                        <TextInput
                            style={basicStyles.lineInput}
                            placeholder="密码"
                            value="123"
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({ password: text }) } />
                    </View>
                    <View style={[basicStyles.link, basicStyles.right]}>
                        <Text style={styles.right}
                            onPress={this.gotoRegister.bind(this) }>还没有注册?</Text>
                    </View>
                    <View>
                        <TouchableOpacity
                            style={[basicStyles.btnContainer, styles.submit]}
                            onPress={this.loginSubmit.bind(this) }>
                            <Text style={basicStyles.button}>登录</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            )
        }
    }

    render() {
        return (<FadeInContainer renderContent={ this.renderContent() }></FadeInContainer>)
    }
}