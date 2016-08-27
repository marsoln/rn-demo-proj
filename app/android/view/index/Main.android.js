import React, {
    View,
    BackAndroid,
    Navigator,
    Text,
    ListView,
    Image,
    ToastAndroid,
    ScrollView,
    TouchableOpacity
} from '../../../libs/system/react'
import apis from '../../../libs/network/apis'
import styles from '../styles/main'
import basicStyles from '../styles/basic'

export default class Main extends React.Component {

    constructor(props) {
        super(props)
        const nav = this.props.nav
        this.state = {
            dataList: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            })
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    renderItem(item, section, index) {
        let uri = !~item.avatar.indexOf('http:') ? `${apis.SERVER}/${item.avatar}` : item.avatar
        return (
            <View style={[styles.listItem, index % 2 == 0 ? styles.light : styles.dark]}>
                <Image style={styles.avatar}
                    source={{ uri: uri }}/>
                <Text key={item.id} style={styles.username}>
                    {item.username}
                </Text>
            </View>
        )
    }

    fetchData() {
        return apis
            .UserApi
            .userList()
            .then((_data) => {
                if (_data) {
                    this.setState({
                        dataList: this.state.dataList.cloneWithRows(_data['userList'])
                    })
                }
                // ToastAndroid.show('数据更新完毕!', ToastAndroid.SHORT)
            })
    }

    render() {
        return (
            <View>
                <View style={basicStyles.window}>
                    <ListView
                        ref="list"
                        style={styles.list}
                        dataSource={this.state.dataList}
                        renderRow={this.renderItem.bind(this) } />
                </View>
                <TouchableOpacity style={[basicStyles.btnContainer, { bottom: 120 }]} onPress={this.fetchData.bind(this) }>
                    <Text style={basicStyles.buttonDark}>从服务器加载数据!!</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
