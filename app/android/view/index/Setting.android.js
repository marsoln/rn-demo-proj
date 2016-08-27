import React, {
    View,
    BackAndroid,
    Navigator,
    ListView,
    Image,
    Text,
    ToastAndroid,
    ScrollView,
    TouchableOpacity
} from '../../../libs/system/react'
import apis from '../../../libs/network/apis'
import styles from '../styles/setting'
import basicStyles from '../styles/basic'

export default class Setting extends React.Component {

    constructor(props) {
        super(props)
    }

    logout() {
        apis
            .UserState
            .logout()
            .then(res => {
                this.props.nav.immediatelyResetRouteStack([
                    { id: 'Login' }
                ])
            })
    }

    render() {
        return (
            <View>
                <View style={basicStyles.window}>
                    <Text style={{ height: 300, backgroundColor: '#aaccee',justifyContent:'center' }}>Settings</Text>
                </View>
                <TouchableOpacity style={[basicStyles.btnContainer, basicStyles.btnDanger, styles.logoutBtn]} onPress={this.logout.bind(this) }>
                    <Text style={basicStyles.button}>登出</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
