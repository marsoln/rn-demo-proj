import { StyleSheet } from 'react-native'

const LIGHT = '#fefefe'
const LIGHT_GRAY = '#eaeaea'
const DARK = '#3e3e3e'
const LIGHT_BORDER = '#8ea367'

const DEFAULT = StyleSheet.create({
    panel: {
        backgroundColor: LIGHT,
        color: DARK
    },
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        borderRadius: 8,
        borderWidth: 1.5,
        borderColor: LIGHT_BORDER,
        padding: 8,
        marginLeft: 12,
        marginRight: 12,
        backgroundColor: LIGHT_GRAY,
    },
    button: {
        color: DARK,
    },
})

let currentStyle = DEFAULT

export default currentStyle