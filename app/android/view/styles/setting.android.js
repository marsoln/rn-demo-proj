import { StyleSheet } from 'react-native'
import {
    LIGHT_GRAY,
    LIGHT,
    LIGHT_GOLDEN,
    LIGHT_SILVER,
    GRAY,
    DARK_GOLDEN,
} from './basic'

export default StyleSheet.create({
    header: {
        height: 88,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: LIGHT_GRAY,
        marginBottom: 8,
        backgroundColor: LIGHT_SILVER,
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
    profileItem: {
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemTitle: {
        flex: 3,
        fontSize: 16,
        height: 20,
        textAlign: 'right',
        color: GRAY,
    },
    itemValue: {
        flex: 7,
        fontSize: 16,
        minHeight: 22,
        paddingLeft: 8,
    },
    logoutBtn: {
        bottom: 130
    }
})