import { StyleSheet } from 'react-native'
import {
    GOLDEN
} from './basic'
export default StyleSheet.create({
    list: {
        height: 300,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        paddingLeft: 12,
        marginBottom: 1,
        flex: 1,
    },
    light: {
        backgroundColor: '#fafafa',
    },
    dark: {
        backgroundColor: '#dedede',
    },
    avatar: {
        width: 45,
        height: 45,
        borderRadius: 90,
        marginLeft: 8,
    },
    username: {
        flex: 3,
        paddingLeft: 15,
        height: 20,
        fontSize: 16,
        fontWeight: 'bold',
    },
    button: {
        bottom: 130,
        backgroundColor: GOLDEN,
    }
})