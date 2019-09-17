import React, { Component, Fragment } from 'react'
import { Text, Content, List, ListItem, Left, Right, Icon, View } from 'native-base'
import { TouchableOpacity, TouchableHighlight } from 'react-native'
import { SearchBar } from 'react-native-elements'
import cssChat from '../../shared/style/chatStyle'

import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'

import { alertAfterTransac } from '../../shared/alert/AlertMessage'
import { actionSheetDelete } from '../../shared/action-sheet/ActionSheet'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUsers, deleteUser, searchUsers } from './user-actions'


class UsersPageComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            search: ''
        }
    }

    componentDidMount() {
        this.props.getUsers()
    }

    searchFilter = (search) => {
        this.props.searchUsers(this.props.user.searchedData, search)
        this.setState({ search })
    }

    onDelete = (data) => {

        if (data.id == this.props.loggedIn.id)
            return alertAfterTransac('Info', 'You cannot delete your own account.', () => console.log(null))

        actionSheetDelete('Are you sure you want to delete '+data.fullname+'?', () => this.props.deleteUser(data.id, null))
    }

    renderCommands(data) {
        return(
            <View style={cssChat.rowBack} >
                
                <TouchableOpacity 
                    style={[cssChat.backRightBtn, cssChat.successBtn]}
                    onPress={ () => console.log('archive') }                                                
                >
                    <Text >
                        <Icon name='ios-archive' style={cssChat.whiteIcon} />
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[cssChat.backRightBtn, cssChat.backRightBtnLeft]} 
                    onPress={ () => console.log('lock') }                                                
                >
                    <Text >
                        <Icon name='ios-lock' style={cssChat.whiteIcon} />
                    </Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                    style={[cssChat.backRightBtn, cssChat.backRightBtnRight]} 
                    onPress={ () => this.onDelete({ id: data.id, fullname: data.fullname }) }                                                
                >
                    <Text style={cssChat.whiteIcon}>
                        DELETE
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderUsersList(data, navigation) {
        return(
            <TouchableHighlight
                style={[cssChat.usersRowFront]}
            >
                <ListItem >
                    <TouchableOpacity 
                        style={cssChat.rowList} 
                        onPress={ () => navigation.navigate('NewUserPage', {
                            action: 'edit',
                            data: data,
                        }) }
                    >
                        <Left>
						    <Text> { data.fullname }</Text>
					    </Left>
                        <Right>
                            <Icon name='ios-arrow-forward' style={{ color: 'grey' }} />
					    </Right>
                    </TouchableOpacity>
                </ListItem>
            </TouchableHighlight>
        )
    }

    render() {
        const { search } = this.state
        const { navigation, user } = this.props

        return (
            <Fragment>
                <Content >  

                    <View style={ cssChat.rowList }>

                        <SearchBar
                            lightTheme
                            cancelIcon
                            searchIcon={{ size: 24 }}
                            containerStyle={ cssChat.searchBarContainer } 
                            inputStyle={{ padding: 0 }}
                            onChangeText={text => this.searchFilter(text)}
                            onClear={text => this.searchFilter('')}
                            placeholder="Type a keyword..."
                            value={search}
                        />

                        <Right style={ cssChat.searchBarRight }>
                            <TouchableOpacity >
                                <Icon type='AntDesign' name='filter' style={cssChat.chatBottomColor} />
                            </TouchableOpacity>
                        </Right>
                    </View>

                    <List>
                        <SwipeListView 
                            data={user.data}
                            renderItem={
                                (data) => (
                                    <SwipeRow
                                        leftOpenValue={75}
                                        rightOpenValue={-150}
                                    >

                                        { this.renderCommands(data.item) }

                                        { this.renderUsersList(data.item, navigation) }

                                    </SwipeRow>
                                )
                            }
                        />
                    </List>

                </Content>
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
        getUsers,
        deleteUser,
        searchUsers
    }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(UsersPageComponent)

