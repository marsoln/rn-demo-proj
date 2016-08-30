import React, {
    Animated,
    StatusBar,
    View,
} from '../../../libs/system/react'
import {WINDOW_WIDTH, WINDOW_HEIGHT } from '../styles/basic'

/**
 * 由于是在这里调用内部元素的render 
 * 所以内部元素中的ref绑定的引用是无法生效的
 */
export default class FadeInContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            fadeAnim: new Animated.Value(0)
        }
    }

    componentDidMount() {
        Animated
            .timing(this.state.fadeAnim, {
                toValue: 1,
                dutation: this.props.dutation || 800
            })
            .start()
    }

    render() {
        return (
            <Animated.View style={{ flex: 1, opacity: this.state.fadeAnim }}>
                <StatusBar hidden={this.props.hidden} />
                { this.props.renderContent() }
            </Animated.View>
        )
    }
}