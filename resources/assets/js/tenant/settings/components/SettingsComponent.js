import React, { Component, Fragment } from 'react'
import { Container, Content, Card, CardItem, Text, List, ListItem, Left, Icon, Right } from 'native-base'
import { TouchableOpacity } from 'react-native'
import css from '../../../shared/style/settingsStyle'

class SettingsComponent extends Component {

    render() {
        const { navigation } = this.props
        const { trans } = this.props.screenProps

        return (
            <Fragment>
                <Container>
                    <Content>
                        <Card>
                            <CardItem header>
                                <Text>{trans.t('settings.title')}</Text>
                            </CardItem>
                            <List>
                                <ListItem>
                                    <TouchableOpacity 
                                        style={css.rowList}
                                        onPress={() => navigation.navigate('LanguagePage')}
                                    > 
                                        <Left>
                                            <Text>
                                                <Icon name='globe' /> {trans.t('settings.list.language')}
                                            </Text>
                                        </Left>
                                        <Right>
                                            <Icon name='ios-arrow-forward'/>
                                        </Right>
                                    </TouchableOpacity>
                                </ListItem>
                                <ListItem>
                                    <TouchableOpacity style={css.rowList}> 
                                        <Left>
                                            <Text>
                                                <Icon name='ios-person' /> {trans.t('settings.list.profile')}
                                            </Text>
                                        </Left>
                                        <Right>
                                            <Icon name='ios-arrow-forward'/>
                                        </Right>
                                    </TouchableOpacity>
                                </ListItem>
                                <ListItem>
                                    <TouchableOpacity 
                                        style={css.rowList} 
                                        onPress={() => navigation.navigate('ChangePasswordPage')} 
                                    > 
                                        <Left>
                                            <Text>
                                                <Icon name='ios-lock' /> {trans.t('settings.list.change_password')}
                                            </Text>
                                        </Left>
                                        <Right>
                                            <Icon name='ios-arrow-forward'/>
                                        </Right>
                                    </TouchableOpacity>
                                </ListItem>
                                <ListItem>
                                    <TouchableOpacity style={css.rowList} onPress={() => navigation.navigate('login')}> 
                                        <Left>
                                            <Text>
                                                <Icon name='ios-log-out' /> {trans.t('settings.list.log_out')}
                                            </Text>
                                        </Left>
                                    </TouchableOpacity>
                                </ListItem>
                            </List>
                        </Card>
                    </Content>
                </Container>
            </Fragment>
            
        )
    }
}



export default SettingsComponent

