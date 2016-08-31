import { StyleSheet } from 'react-native'
import {
    LIGHT_GRAY,
    GRAY,
} from './basic'

export default StyleSheet.create({
    header: {
        height: 88,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: LIGHT_GRAY,
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginLeft: 8,
    },
    usernameContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginLeft: 15,
    },
    nickname: {
        fontSize: 18,
    },
    username: {
        fontSize: 16,
        color: GRAY,
    },
    logoutBtn: {
        bottom: 130
    }
})