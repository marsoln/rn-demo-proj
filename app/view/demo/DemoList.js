import React from 'react'
import { AppRegistry,
    View,
    BackAndroid,
    Navigator,
    Text,
    ListView,
    ToastAndroid,
    ScrollView,
    TouchableOpacity } from 'react-native'
import api from '../../network/API'
// import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view'
import styles from '../styles/demoList'
import basicStyle from '../styles/basic'

export default class DemoList extends React.Component {

    constructor(props) {
        super(props)
        const nav = this.props.nav
        this.state = {
            data: null,
            dataList: new ListView.DataSource({
                rowHasChanged: (r1, r2) => r1 !== r2,
            })
        }
    }

    componentDidMount() {
        this.fetchData()
    }

    renderItem(item) {
        return (
            <Text key={item.id} style={[styles.listItem,basicStyle.panel]}>
                大家好, 我是{item.name}, 我今年{item.age}岁.
            </Text>
        )
    }

    fetchData() {
        return api.Test
            .getTestData()
            .then((_data) => {
                this.setState({
                    data: _data,
                    dataList: this.state.dataList.cloneWithRows(_data)
                })
            })
    }

    clickBtn() {
        this
            .fetchData()
            .then(() => {
                ToastAndroid.show('数据更新完毕!', ToastAndroid.SHORT)
            })
    }

    render() {
        // <ScrollView style={{height:400}}>
        //             {
        //                 this.state.data && this.state.data.map((item) => {
        //                     return (
        //                         <Text key={item.id} style={styles.listItem}>
        //                             大家好, 我是{item.name}, 我今年{item.age}岁.
        //                         </Text>
        //                     )
        //                 })
        //             }
        //         </ScrollView>
        return (
            <View>
                <ListView
                    ref="list"
                    style={styles.list}
                    dataSource={this.state.dataList}
                    renderRow={this.renderItem.bind(this) }
                    />
                <TouchableOpacity style={basicStyle.btnContainer} onPress={this.clickBtn.bind(this) }>
                    <Text style={basicStyle.button}>从服务器加载数据!!</Text>
                </TouchableOpacity>
            </View>
        )
    }
}
