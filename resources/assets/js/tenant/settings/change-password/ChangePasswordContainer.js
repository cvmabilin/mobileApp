import React, { Component, Fragment } from 'react'
import { Text, Content, Container, Form, Item, Label, Input, Button } from 'native-base'

import tenantUserController from '../../../../../../Controller/realm/tenantUserController'

import { connect } from 'react-redux'
import { showToast } from '../../../shared/toast/Toast'
import { alertAfterTransac } from '../../../shared/alert/AlertMessage'

import { changePasswordConstraints, showValidatedFields } from '../../../shared/validator/change-password/ChangePasswordValidator'
import css from '../../../shared/style/userStyle'
import validate from 'validate.js'

class ChangePasswordContainer extends Component {

    constructor(props) {
        super(props)

        this.state = {
            current_password: '',
            new_password: '',
            retype_password: '',
            errors: '',
            disabled: false
        }
    }

    componentDidMount() {
        this.loadComponent()
    }

    loadComponent = () => {

        this.props.navigation.addListener('didFocus', () => {
            this.setState({
                current_password: '',
                new_password: '',
                retype_password: '',
                errors: undefined,
                disabled: false

            })
        })
    }

    async onChangePassword() {

        const { current_password, new_password, retype_password } = this.state
        const { code, username, id } = this.props.loggedIn
        let { trans } = this.props.screenProps

        let result = this.validateFields({
            current_password,
            new_password,
            retype_password
        }, changePasswordConstraints, trans)

        if (result != undefined)
            return false

        let checkCurrentPassword = await tenantUserController.userLogin({ code: code, username: username, password: current_password })

        if (!checkCurrentPassword.result)
            return showToast(trans.t('change_password.form.validations.incorrect'), trans.t('change_password.form.validations.okay'), 'danger')

        this.setState({ disabled: true })

        let changePassword = await tenantUserController.changePassword({ id, new_password })

        if (changePassword.result)
            return alertAfterTransac(trans.t('change_password.form.validations.success'), trans.t('change_password.form.validations.changed'), () => this.props.navigation.goBack())

        return showToast(trans.t('change_password.form.validations.error'), changePassword.message, 'danger')
    }

    validateFields = (data, constraints, trans) => {
        

        validate.validators.presence.message = trans.t('change_password.form.validations.required')

        this.setState({
            errors: validate(data, constraints)
        })

        return validate(data, constraints)
    }

    render() {
        let { current_password, new_password, retype_password, errors, disabled } = this.state
        let { trans } = this.props.screenProps
        let validated = showValidatedFields(errors)

        return (
            <Fragment>
                <Container style={{ flex: 2 }}>
                    <Content >
                        <Form>
                            <Item error={validated.errorCurrent} stackedLabel>
                                <Label>{trans.t('change_password.form.label.current_password')} <Text style={ css.error } >{ validated.errorCurrentMessage }</Text></Label>
                                <Input value={ current_password } secureTextEntry={true} onChangeText={ (current_password) => this.setState({current_password}) } autoCapitalize='none' />
                            </Item>

                            <Item error={validated.errorNewPass} stackedLabel>
                                <Label>{trans.t('change_password.form.label.new_password')} <Text style={ css.error } >{ validated.errorNewPassMessage }</Text></Label>
                                <Input value={ new_password } secureTextEntry={true} onChangeText={ (new_password) => this.setState({new_password}) } autoCapitalize='none' />
                            </Item>
                            <Item error={validated.errorRetypePass} stackedLabel>
                                <Label>{trans.t('change_password.form.label.retype_password')} <Text style={ css.error } >{ validated.errorRetypePassMessageMessage }</Text></Label>
                                <Input value={ retype_password } secureTextEntry={true} onChangeText={ (retype_password) => this.setState({retype_password}) } autoCapitalize='none' />
                            </Item>
                        </Form>
                    </Content>
                </Container>

                <Container style={{ flex: 1 }}> 
                    <Content padder>
                        <Button success block disabled={disabled}
                            onPress={ () => this.onChangePassword() }
                        >
                            <Text>{trans.t('change_password.form.buttons.change_password')}</Text>
                        </Button> 
                    </Content>
                </Container>
            </Fragment>
        );
    }
};

const mapStateToProps = state => {
    
    const { login } = state
    const { loggedIn } = login
    return {
        loggedIn
    }
};

export default connect(mapStateToProps)(ChangePasswordContainer)