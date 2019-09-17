import React, { Component, Fragment } from 'react';
import NavHeader from '../shared/nav/Header'

class DefaultPage extends Component {

    static navigationOptions = ({navigation}) => {
        return {
            title: navigation.getParam('page_title')
        }
    }


    render() {
        return (
            <Fragment>
            </Fragment>
        );
    }
};

export default DefaultPage;

