import { StyleSheet } from 'react-native'
export default StyleSheet.create({
    list: {
        height: 400,
    },
    listItem: {
        flexDirection: 'row',
        padding: 5,
        paddingLeft: 12,
        marginBottom: 1,
        flex: 1,
    },
    light: {
        backgroundColor: '#f8faf1',
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
        marginTop: 12,
        height: 20,
        fontSize: 16,
        fontWeight: 'bold',
    }
})