import React, { Component, Fragment } from 'react'
import { Content, List, ListItem, Left, Body, Text, Right, Thumbnail, Footer, FooterTab, Badge, Button, Icon, View, Picker, Item } from 'native-base'
import { TouchableOpacity, TouchableHighlight } from 'react-native'
import { alertMessage } from '../../../shared/alert/AlertMessage'
import def from '../../../shared/images/default.jpg'
import ninja from '../../../shared/images/ninja.png'
import css from '../../../shared/style/chatStyle'
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view'
import { SearchBar } from 'react-native-elements'
import Modal from 'react-native-modal';

class MessagesPage extends Component {

    constructor() {
        super()

        this.state = {
            list: [
                {
                    id: 1,
                    img: ninja,
                    name: 'Kadou Ninja',
                    message: 'I waaaant it thatt wayyy',
                    date: 'Just Now',
                    date_time: new Date(),
                    read: false
                },
                {
                    id: 2,
                    img: def,
                    name: 'Employee 101',
                    message: 'Believe.. when i sayyy',
                    date: '04:43 pm',
                    date_time: '08/12/2019 04:43:00',
                    read: true
                },
                {
                    id: 3,
                    img: def,
                    name: 'Employee 102',
                    message: 'The one disireeeee',
                    date: '04:44 pm',
                    date_time: '08/11/2019 04:44:00',
                    read: true
                },
                {
                    id: 4,
                    img: def,
                    name: 'Employee 103',
                    message: 'You areeee my fiiireee',
                    date: '04:44 am',
                    date_time: '08/10/2019 04:44 am',
                    read: false
                },
            ],
            search: '',
            category: undefined,
            all: undefined,
            select: undefined,
            category_list: ['All Categories', 'No Category', 'Regular'],
            all_list: ['All', 'Message', 'Contact', 'Anken'],
            select_list: ['Recent', 'Unread'],
            showModal: false,
        }

        this.listHolder = this.state.list
    }

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    };
    
    renderCommands(data) {
        return(
            <View style={css.rowBack} >
                <TouchableOpacity 
                    style={[css.backRightBtn, css.successBtn]}
                    onPress={ () => alertMessage('Archive', 'Archive '+ data.name + '?') }                                                
                >
                    <Text >
                        <Icon name='ios-archive' style={css.whiteIcon} />
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[css.backRightBtn, css.backRightBtnLeft]} 
                    onPress={ () => alertMessage('Lock', 'Are you sure you want to Lock '+ data.name + '?') }                                                
                >
                    <Text >
                        <Icon name='ios-lock' style={css.whiteIcon} />
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                    style={[css.backRightBtn, css.backRightBtnRight]} 
                    onPress={ () => alertMessage('Block','Are you sure you want to Block '+ data.name + '?') }                                                
                >
                    <Text >
                        <Icon type='MaterialIcons' name='block' style={css.whiteIcon} />
                    </Text>
                </TouchableOpacity>
            </View>
        )
    }

    renderChatList(data, navigation) {
        return(
            <TouchableHighlight
                style={[css.rowFront, (data.read) ? {} : css.readChat]}
            >
                <ListItem avatar >
                    <TouchableOpacity 
                        style={css.rowList} 
                        onPress={ () => navigation.navigate('ChatMessagePage', {
                            data: data,
                        }) }
                    >
                        <Left>
                            <Thumbnail source={data.img} />
                        </Left>
                        <Body>
                            <Text
                                style={[ (data.read) ? {} : css.unreadFont ]}
                            >
                                {data.name}
                            </Text>
                            <Text 
                                note
                                style={[ (data.read) ? {} : css.unreadFont ]}
                            >{data.message}</Text>
                        </Body>
                        <Right>
                            <Text 
                                note
                                style={[ (data.read) ? {} : css.unreadFont ]}
                            >{data.date}</Text>
                        </Right>
                    </TouchableOpacity>
                </ListItem>
            </TouchableHighlight>
        )
    }

    renderFooter() {
        return(
            <Footer >
                <FooterTab style={css.chatBottomMenu}>
                    <Button badge vertical >
                        <Badge><Text>2</Text></Badge>
                        <Icon name="ios-chatboxes"  style={css.chatBottomColor}/>
                        <Text style={css.chatBottomColor}>Message</Text>
                    </Button>
                    <Button badge vertical >
                        <Badge ><Text>6</Text></Badge>

                        <Icon name="lock" style={css.chatBottomColor}/>
                        <Text style={css.chatBottomColor}>Lock</Text>
                    </Button>
                    <Button vertical >
                        <Icon name="bookmarks" style={css.chatBottomColor} />
                        <Text style={css.chatBottomColor}>Schedule</Text>
                    </Button>
                </FooterTab>
            </Footer>
        )
    }

    searchFilter = (text) => {

        const newData = this.listHolder.filter( (item) => {
 
            const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase()
            const textData = text.toUpperCase()

            return itemData.indexOf(textData) > -1

        })

        this.setState({
            list: newData,
            search: text,
        })
    }


    renderModal() {
        const { showModal, category, all, select, category_list, all_list, select_list } = this.state
        return(
            <Modal 
                isVisible={showModal}
                onBackdropPress={() => this.toggleModal()}
            >
                <View style={ css.modalView }>
                    <Text style={ css.modalText }>Select Filter</Text>

                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down" />}
                            placeholder="All Categories"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={category}
                            onValueChange={(category) => this.setState({category}) }
                        >
                            { category_list.map((item, index) =>  <Picker.Item label={item} value={index} key={index}/> ) }
                        </Picker>
                    </Item>

                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down" />}
                            placeholder="All"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={all}
                            onValueChange={(all) => this.setState({all}) }
                        >
                            { all_list.map((item, index) =>  <Picker.Item label={item} value={index} key={index}/> ) }
                        </Picker>
                    </Item>

                    <Item picker>
                        <Picker
                            mode="dropdown"
                            iosIcon={<Icon name="ios-arrow-down" />}
                            placeholder="Select"
                            placeholderStyle={{ color: "#bfc6ea" }}
                            placeholderIconColor="#007aff"
                            selectedValue={select}
                            onValueChange={(select) => this.setState({select}) }
                        >
                            { select_list.map((item, index) =>  <Picker.Item label={item} value={index} key={index} /> ) }
                        </Picker>
                    </Item>

                    <Button 
                        success 
                        onPress={ () => this.toggleModal() }
                        block
                        style={ css.modalButton }
                    >
                        <Text>
                            Done
                        </Text>
                    </Button>
                </View>
            </Modal>
        )
    }

    render() {
        const { navigation } = this.props
        const { list, search } = this.state
        return (
            <Fragment>

                { this.renderModal() }

                <Content>

                    <View style={ css.rowList }>

                        <SearchBar
                            lightTheme
                            cancelIcon
                            searchIcon={{ size: 24 }}
                            containerStyle={ css.searchBarContainer }
                            inputStyle={{ padding: 0 }}
                            onChangeText={text => this.searchFilter(text)}
                            onClear={text => this.searchFilter('')}
                            placeholder="Type a keyword..."
                            value={search}
                        />

                        <Right style={ css.searchBarRight }>
                            <TouchableOpacity onPress={ () => this.toggleModal() }>
                                <Icon type='AntDesign' name='filter' style={css.chatBottomColor} />
                            </TouchableOpacity>
                        </Right>

                    </View>

                    <List>
                        <SwipeListView 
                            closeOnRowPress={true}
                            data={list}
                            renderItem={
                                (data) => (
                                    <SwipeRow
                                        leftOpenValue={75}
                                        rightOpenValue={-150}
                                    >
                                        
                                        { this.renderCommands(data.item) }

                                        { this.renderChatList(data.item, navigation) }

                                    </SwipeRow>
                                )
                            }
                        />
                    </List>
                </Content>

                { this.renderFooter() }

            </Fragment>
        );
    }
};

export default MessagesPage;

