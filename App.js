import React, { Component } from 'react'
import { Root } from 'native-base'
import RoutesIndex from './resources/assets/js/index'
import { Provider } from 'react-redux'
import store from './resources/assets/js/tenant/admin-store'

class App extends Component {

  render() {

    return (
      <Provider store={ store }>
        <Root>
          <RoutesIndex />
        </Root>
      </Provider>
    );
  }
};


export default App

