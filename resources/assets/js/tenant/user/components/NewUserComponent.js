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

    onDelete = () => {
        const { fullname, id } = this.props.navigation.getParam('data')

        if (id == this.props.loggedIn.id)
            return alertAfterTransac(
                'Info',
                'You cannot delete your own account.',
                () => null)
        
        actionSheetDelete(
            'Are you sure you want to delete '+fullname+'?',
            () => this.props.deleteUser(id, this.returnToUsers)
        )
    }

    onUpdate = () => {
        let selectedUser = this.props.navigation.getParam('data')
        const { code, first_name, middle_name, last_name } = this.state

        let result = this.validateFields({
            code,
            first_name,
            middle_name,
            last_name,
        }, editUserConstraints)

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

        this.props.updateUser(data, this.returnToUsers)
    }

    onSave = () => {
        let { username, password, code, first_name, middle_name, last_name, confirmPassword } = this.state

        let result = this.validateFields({
            code,
            username,
            first_name,
            last_name,
            password,
            confirmPassword
        }, newUserConstraints)

        if (result != undefined)
            return false

        this.props.saveUser({ username, password, code, first_name, middle_name, last_name }, this.returnToUsers)
    }

    validateFields = (data, constraints) => {
        

        validate.validators.presence.message = '(This field is required.)'

        this.setState({
            errors: validate(data, constraints)
        })

        return validate(data, constraints)
    }

    renderUpdateCommands = (disableButton) => {
        return(
            <Fragment>

                <Button 
                    primary 
                    block
                    onPress={ () => this.cancelEdit() }
                    style = {{ marginBottom: 5 }}
                >
                    <Text>Cancel</Text>
                </Button> 

                <Button 
                    disabled= {disableButton} 
                    info 
                    block
                    
                    onPress={ () => this.onUpdate() }
                    >
                        <Text>Update</Text>
                </Button> 
            </Fragment>
        )
    }

    renderViewCommands = () => {
        return(
            <Fragment>
                <Button info block
                    style = {{ marginBottom: 5 }}
                    onPress={ () => this.editUser() }
                    >
                        <Text>Edit</Text>
                    </Button> 
                    <Button danger block
                        onPress={ () => this.onDelete() }
                    >
                    <Text>Delete</Text>
                </Button> 
            </Fragment>
        )
    }

    renderCredential = (username, password, confirmPassword, disabled, validated) => {
        return(
            <Fragment>
                <Item error={ validated.errorUser } stackedLabel>
                    <Label>Username <Text style={ css.error } >{ validated.errorUserMessage }</Text></Label>
                    <Input disabled={disabled} value={username} onChangeText={ (username) => this.setState({username}) } autoCapitalize='none' />
                </Item>
                <Item error={ validated.errorPass } stackedLabel >
                    <Label>Password <Text style={ css.error } >{ validated.errorPassMessage }</Text></Label>
                    <Input disabled={disabled} secureTextEntry={true} value={password} onChangeText={ (password) => this.setState({password}) } autoCapitalize='none' />
                </Item>
                <Item error={ validated.errorConPass } stackedLabel >
                    <Label>Confirm Password <Text style={ css.error } >{ validated.errorConPassMessage }</Text></Label>
                    <Input disabled={disabled} secureTextEntry={true} value={confirmPassword} onChangeText={ (confirmPassword) => this.setState({confirmPassword}) } autoCapitalize='none' />
                </Item>
            </Fragment>
        )
    }

    render() {
        let { navigation } = this.props
        let { code, username, password, confirmPassword, first_name, middle_name, last_name, disableButton, disabled, action, errors } = this.state
        action = navigation.getParam('action')

        let validated = showValidatedFields(action, errors)

        return (
            <Fragment>
                <Container style={ css.form }>
                    <Content >
                        <Form>
                            <Item error={ validated.errorCode } stackedLabel>
                                <Label>Code <Text style={ css.error } >{ validated.errorCodeMessage }</Text></Label>
                                <Input disabled={disabled} value={ code } onChangeText={ (code) => this.setState({code}) } autoCapitalize='none' />
                            </Item>

                            { (action == 'add') ? this.renderCredential(username, password, confirmPassword, disabled, validated) : <Fragment></Fragment> }

                            <Item error={ validated.errorFirst } stackedLabel>
                                <Label>First Name <Text style={ css.error } >{ validated.errorFirstMessage }</Text></Label>
                                <Input disabled={disabled} value={ first_name } onChangeText={ (first_name) => this.setState({first_name}) } autoCapitalize='none' />
                            </Item>
                            <Item stackedLabel>
                                <Label>Middle Name</Label>
                                <Input disabled={disabled} value={ middle_name } onChangeText={ (middle_name) => this.setState({middle_name}) } autoCapitalize='none' />
                            </Item>
                            <Item error={ validated.errorLast } stackedLabel>
                                <Label>Last Name <Text style={ css.error } >{ validated.errorLastMessage }</Text></Label>
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
                                    onPress={ () => this.onSave() }
                                >
                                    <Text>Save</Text>
                                </Button> 
                            : (action == 'edit' && disabled == false) ? this.renderUpdateCommands(disableButton) : this.renderViewCommands()

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