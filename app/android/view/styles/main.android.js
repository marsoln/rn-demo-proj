import { StyleSheet } from 'react-native'
export default StyleSheet.create({
    list: {
        height: 400,
        marginTop: 55,
    },
    listItem: {
        flexDirection: 'row',
        padding: 12,
        marginBottom: 2,
        flex: 1,
    },
    light: {
        backgroundColor: '#eaf3f5',
    },
    dark: {
        backgroundColor: '#b8daf1',
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