import { StyleSheet } from 'react-native'
export default StyleSheet.create({
    header: {
        height: 160,
        padding: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 10,
        marginLeft: 8,
    },
    username: {
        marginLeft: 15,
        fontSize: 18,
    },
    logoutBtn: {
        bottom: 130
    }
})