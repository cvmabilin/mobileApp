import React, { Component, Fragment } from 'react'
import { Container, Text } from 'native-base'
import css from '../../../shared/style/menuStyle'
import { connect } from 'react-redux'

class MainComponent extends Component {

    render() {
        const { fullname } = this.props.loggedIn
        const { trans } = this.props.screenProps
        return (
            <Fragment>
                <Container style={ css.title }>
                    <Text style={ css.fontColor }>
                        {
                            trans.t('main.welcome', {fullname: fullname})
                        }
                    </Text>
                </Container>
            </Fragment>
        )
    }
}

const mapStateToProps = (state) => {
    const { loggedIn } = state.login
    return {
        loggedIn
    }
}

export default connect(mapStateToProps)(MainComponent)