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

import basicStyles from '../styles/basic'
import DelayTrigger from '../../../libs/tools/delayTrigger'
import GUID from '../../../libs/tools/guid'


export default class Button extends React.Component {

    constructor(props) {
        super(props)
        this.guid = GUID()
    }

    pressEventHandler() {
        let handler = this.props.onPress
        if (handler) {
            if (this.props.delay !== false)
                DelayTrigger.addTrigger(`buttonPress.${this.guid}`, handler)
            else
                handler()
        }
    }

    render() {
        return (
            <TouchableOpacity style={[basicStyles.btnContainer, this.props.wrapperStyle]} onPress={this.pressEventHandler.bind(this) }>
                <Text style={[basicStyles.button, this.props.buttonStyle]}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}
