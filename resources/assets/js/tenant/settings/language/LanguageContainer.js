import React, { Component, Fragment } from 'react'
import { Text, Content, Container, Form, Item, Button, Picker, Icon, Label } from 'native-base'
import { alertAfterTransac } from '../../../shared/alert/AlertMessage'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { changeLanguage } from './language-actions'

class LanguageContainer extends Component {

    constructor(props) {
        super(props)

        let currentLocale = this.props.system.locale

        this.state = {
            locale: currentLocale,
            languages: [
                { locale: 'en', lang: 'English' },
                { locale: 'jp', lang: 'Japanese' },
            ]
        }
    }

    saveLocale = () => {
        this.props.changeLanguage(this.state.locale)
        alertAfterTransac('Success', 'Successfully changed.', () => this.props.navigation.goBack())
    }

    render() {
        let { locale, languages } = this.state
        let { trans } = this.props.screenProps
        return (
            <Fragment>
                <Container >
                    <Content >
                        <Form>
                            <Item picker>
                                <Label>{trans.t('language.label.language')}</Label>
                                <Picker
                                    mode="dropdown"
                                    iosIcon={<Icon name="ios-arrow-down" />}
                                    selectedValue={locale}
                                    onValueChange={(locale) => this.setState({locale}) }
                                >
                                    { languages.map((item, index) =>  <Picker.Item label={item.lang} value={item.locale} key={index}/> ) }
                                </Picker>
                            </Item>

                        
                        </Form>
                    </Content>
                </Container>

                <Container > 
                    <Content padder>
                        <Button
                            success 
                            block
                            onPress={ () => this.saveLocale() }
                        >
                            <Text>{trans.t('language.buttons.save')}</Text>
                        </Button> 
                    </Content>
                </Container>
            </Fragment>
        );
    }
};


const mapStateToProps = (state) => {
    const { system } = state.language
    return {
        system
    }
}

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        changeLanguage,
    }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(LanguageContainer)