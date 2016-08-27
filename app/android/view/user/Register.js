import React, {
    Alert,
    View,
    Text,
    TextInput,
    TouchableOpacity
} from '../../../libs/system/react'

import apis from '../../../libs/network/apis'
import styles from '../styles/loginAndRegister'
import basicStyles, {LIGHT_GREEN} from '../styles/basic'
import FadeInContainer from '../common/FadeInContainer'

export default class Register extends React.Component {

    constructor(props) {
        super(props)
    }

    gotoLogin() {
        this.props.nav.immediatelyResetRouteStack([{ id: 'Login' }])
    }

    renderContent() {
        return () => {
            return (
                <View style={basicStyles.container}>
                    <Text style={styles.header}>注册</Text>
                    <View>
                        <TextInput
                            ref="username"
                            style={basicStyles.lineInput}
                            placeholder="用户名"
                            onChangeText={(text) => this.setState({ username: text }) }/>
                        <TextInput
                            ref="password"
                            style={basicStyles.lineInput}
                            placeholder="密码"
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({ password: text }) } />
                        <TextInput
                            ref="confirmPassword"
                            style={basicStyles.lineInput}
                            placeholder="确认密码"
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({ confirmPassword: text }) } />
                    </View>
                    <View style={[basicStyles.link, basicStyles.right]}>
                        <Text style={styles.right}
                            onPress={this.gotoLogin.bind(this) }>已经有账号</Text>
                    </View>
                    <View>
                        <TouchableOpacity style={[basicStyles.btnContainer, {
                            backgroundColor: LIGHT_GREEN,
                        }, styles.submit]}>
                            <Text style={basicStyles.button}>注册</Text>
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