import React, { Component } from 'react'
import trans from './translation'
import Routes from '../../../routes/routes'
import { connect } from 'react-redux'

class RoutesIndex extends Component {

  render() {
    trans.locale = this.props.system.locale
    return (
        <Routes screenProps={{trans}} />
    )
  }
}

const mapStateToProps = (state) => {
    const { system } = state.language
    return {
        system
    }
}

export default connect(mapStateToProps)(RoutesIndex)

