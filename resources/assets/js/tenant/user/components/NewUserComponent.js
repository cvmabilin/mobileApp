import React, { Component, Fragment } from 'react'
import { Text, Content, Container, Form, Item, Label, Input, Button } from 'native-base'
import { alertAfterTransac } from '../../../shared/alert/AlertMessage'
import { actionSheetDelete } from '../../../shared/action-sheet/ActionSheet'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { saveUser, updateUser, deleteUser } from '../user-actions'

import css from '../../../shared/style/userStyle'

import validate from 'validate.js'
import { newUserConstraints, editUserConstraints, showValidatedFields } from '../../../shared/validator/user/UserValidator'

class NewUserComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: '',
            code: '',
            username: '',
            password: '',
            confirmPassword: '',
            first_name: '',
            middle_name: '',
            last_name: '',
            buttonChange: false,
            disableButton: false,
            disabled: true,
            errors: undefined,
            action: 'add'
        }
    }

    componentDidMount() {
        this.loadComponent()
    }

    loadComponent = () => {

        this.props.navigation.addListener('didFocus', () => {
            const { navigation } = this.props

            const data = navigation.getParam('data')
            const action = navigation.getParam('action')

            if (action == 'edit')
                return this.setState({
                    code: data.code,
                    username: data.username,
                    first_name: data.first_name,
                    middle_name: data.middle_name,
                    last_name: data.last_name,
                    disabled: true,
                    disableButton: false,
                    buttonChange: false,
                    action: action,
                    errors: undefined
                })

            return this.setState({
                code: '',
                username: '',
                first_name: '',
                middle_name: '',
                last_name: '',
                password: '',
                confirmPassword: '',
                disableButton: false,
                disabled: false,
                buttonChange: false,
                action: action,
                errors: undefined
            })
        })
    }

    editUser = () => {

        return this.setState({
            disabled: false, 
            buttonChange: true
        })
    }

    cancelEdit = () => {

        const data = this.props.navigation.getParam('data')

        return this.setState({
            code: data.code,
            username: data.username,
            first_name: data.first_name,
            middle_name: data.middle_name,
            last_name: data.last_name,
            disableButton: false,
            disabled: true, 
            buttonChange: false,
            errors: undefined
        })
    }

    returnToUsers = () => {
        return this.props.navigation.navigate('UsersPage')
    }

    onDelete = trans => {
        const { fullname, id } = this.props.navigation.getParam('data')

        if (id == this.props.loggedIn.id)
            return alertAfterTransac(
                trans.t('new_users.form.validation.info'),
                trans.t('new_users.form.validation.delete_account'),
                () => null)
        
        actionSheetDelete(
            trans.t('new_users.form.validation.delete_confirmation') +fullname+'?',
            () => this.props.deleteUser(id, this.returnToUsers, trans)
        )
    }

    onUpdate = trans => {
        let selectedUser = this.props.navigation.getParam('data')
        const { code, first_name, middle_name, last_name } = this.state

        let result = this.validateFields({
            code,
            first_name,
            middle_name,
            last_name,
        }, editUserConstraints, this.props.screenProps.trans)

        if (result != undefined)
            return false

        let data = {
            code,
            first_name,
            middle_name,
            last_name,
            id: selectedUser.id,
            loggedId: this.props.loggedIn.id
        }

        this.props.updateUser(data, this.returnToUsers, trans)
    }

    onSave = trans => {
        let { username, password, code, first_name, middle_name, last_name, confirmPassword } = this.state

        let result = this.validateFields({
            code,
            username,
            first_name,
            last_name,
            password,
            confirmPassword
        }, newUserConstraints, this.props.screenProps.trans)

        if (result != undefined)
            return false

        this.props.saveUser({ username, password, code, first_name, middle_name, last_name }, this.returnToUsers, trans)
    }

    validateFields = (data, constraints, trans) => {

        validate.validators.presence.message = trans.t('new_users.form.validation.required') 

        this.setState({
            errors: validate(data, constraints)
        })

        return validate(data, constraints)
    }

    renderUpdateCommands = (disableButton, trans) => {
        return(
            <Fragment>

                <Button 
                    primary 
                    block
                    onPress={ () => this.cancelEdit() }
                    style = {{ marginBottom: 5 }}
                >
                    <Text>{ trans.t('new_users.form.buttons.cancel') }</Text>
                </Button> 

                <Button 
                    disabled= {disableButton} 
                    info 
                    block
                    
                    onPress={ () => this.onUpdate(trans) }
                    >
                        <Text>{ trans.t('new_users.form.buttons.update') }</Text>
                </Button> 
            </Fragment>
        )
    }

    renderViewCommands = trans => {
        return(
            <Fragment>
                <Button info block
                    style = {{ marginBottom: 5 }}
                    onPress={ () => this.editUser() }
                    >
                        <Text>{ trans.t('new_users.form.buttons.edit') }</Text>
                    </Button> 
                    <Button danger block
                        onPress={ () => this.onDelete(trans) }
                    >
                    <Text>{ trans.t('new_users.form.buttons.delete') }</Text>
                </Button> 
            </Fragment>
        )
    }

    renderCredential = (username, password, confirmPassword, disabled, validated, trans) => {
        return(
            <Fragment>
                <Item error={ validated.errorUser } stackedLabel>
                    <Label>{ trans.t('new_users.form.label.username') } <Text style={ css.error } >{ validated.errorUserMessage }</Text></Label>
                    <Input disabled={disabled} value={username} onChangeText={ (username) => this.setState({username}) } autoCapitalize='none' />
                </Item>
                <Item error={ validated.errorPass } stackedLabel >
                    <Label>{ trans.t('new_users.form.label.password') } <Text style={ css.error } >{ validated.errorPassMessage }</Text></Label>
                    <Input disabled={disabled} secureTextEntry={true} value={password} onChangeText={ (password) => this.setState({password}) } autoCapitalize='none' />
                </Item>
                <Item error={ validated.errorConPass } stackedLabel >
                    <Label>{ trans.t('new_users.form.label.confirm_password') } <Text style={ css.error } >{ validated.errorConPassMessage }</Text></Label>
                    <Input disabled={disabled} secureTextEntry={true} value={confirmPassword} onChangeText={ (confirmPassword) => this.setState({confirmPassword}) } autoCapitalize='none' />
                </Item>
            </Fragment>
        )
    }

    render() {
        let { navigation, screenProps } = this.props
        let { code, username, password, confirmPassword, first_name, middle_name, last_name, disableButton, disabled, action, errors } = this.state
        action = navigation.getParam('action')
        let { trans } = screenProps
        let validated = showValidatedFields(action, errors)

        return (
            <Fragment>
                <Container style={ css.form }>
                    <Content >
                        <Form>
                            <Item error={ validated.errorCode } stackedLabel>
                                <Label>{ trans.t('new_users.form.label.code') } <Text style={ css.error } >{ validated.errorCodeMessage }</Text></Label>
                                <Input disabled={disabled} value={ code } onChangeText={ (code) => this.setState({code}) } autoCapitalize='none' />
                            </Item>

                            { (action == 'add') ? this.renderCredential(username, password, confirmPassword, disabled, validated, trans) : <Fragment></Fragment> }

                            <Item error={ validated.errorFirst } stackedLabel>
                                <Label>{ trans.t('new_users.form.label.first_name') } <Text style={ css.error } >{ validated.errorFirstMessage }</Text></Label>
                                <Input disabled={disabled} value={ first_name } onChangeText={ (first_name) => this.setState({first_name}) } autoCapitalize='none' />
                            </Item>
                            <Item stackedLabel>
                                <Label>{ trans.t('new_users.form.label.middle_name') }</Label>
                                <Input disabled={disabled} value={ middle_name } onChangeText={ (middle_name) => this.setState({middle_name}) } autoCapitalize='none' />
                            </Item>
                            <Item error={ validated.errorLast } stackedLabel>
                                <Label>{ trans.t('new_users.form.label.last_name') } <Text style={ css.error } >{ validated.errorLastMessage }</Text></Label>
                                <Input disabled={disabled} value={ last_name } onChangeText={ (last_name) => this.setState({last_name}) } autoCapitalize='none' />
                            </Item>
                        </Form>
                    </Content>
                </Container>

                <Container style={ css.commands }> 
                    <Content padder>

                        {
                            (action == 'add') ?
                                <Button disabled={disableButton} success block
                                    onPress={ () => this.onSave(trans) }
                                >
                                    <Text>{ trans.t('new_users.form.buttons.save') }</Text>
                                </Button> 
                            : (action == 'edit' && disabled == false) ? this.renderUpdateCommands(disableButton, trans) : this.renderViewCommands(trans)

                        }

                    </Content>
                </Container>
            </Fragment>
        );
    }
};

const mapStateToProps = state => {

    const { user, login } = state
    const { loggedIn } = login
    return {
        user,
        loggedIn
    }
};

const mapDispatchToProps = dispatch => (
    bindActionCreators({
        saveUser,
        updateUser,
        deleteUser
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(NewUserComponent)