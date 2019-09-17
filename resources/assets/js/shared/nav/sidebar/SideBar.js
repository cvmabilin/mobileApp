import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Icon, List, ListItem, Left, Right } from 'native-base'
import SideBarHeader from './components/SideBarHeader';
import SideBarMenuItems from './components/SideBarMenuItems'
import css from "../../style/sideBarStyle";
import { DrawerActions } from 'react-navigation-drawer';

class SideBar extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mainDrawer: true,
			currentComponent: '',
		};
	}

	toggleMainDrawer = () =>
		this.setState(prevState => ({ mainDrawer: !prevState.mainDrawer }))

	renderMenuList = (MenuItems, trans) =>
		Object.keys(MenuItems).map(item =>
			<ListItem key={item} >
				<TouchableOpacity 
					onPress={() => this.mainMenuAction(MenuItems[item], item)} 
					style={ css.outerSideBarView }
				>
					<Left>
						<Text><Icon name={MenuItems[item].icon} /> { MenuItems[item].name(trans) }</Text>
					</Left>
					<Right>
						{
							MenuItems[item].hasOwnProperty('childrens') ? <Icon name='ios-arrow-forward'/> : <Text></Text>
						}
					</Right>
				</TouchableOpacity>
			</ListItem>
        )

    renderSubMenuList = (subMenuItems, trans) => 
        subMenuItems.map((items, index) => (
            <ListItem key={index}>
				<TouchableOpacity 
					onPress={() => this.subMenuAction(items)} 
				>
					<Left>
						<Text><Icon name={items.icon} /> {items.name(trans)}</Text>
					</Left>
				</TouchableOpacity>
            </ListItem>
        ))

	navigateToCallback = routeName => {
		this.setState({ mainDrawer: true })
		this.props.navigation.navigate(routeName)
	}

	mainMenuAction = (subMenuItems, currentMenu) => {

		if (subMenuItems.hasOwnProperty('childrens'))
			return this.setState({
				mainDrawer: false,
				currentComponent: currentMenu
			})

		this.props.navigation.navigate(subMenuItems.route)
	}

	subMenuAction = (selectedMenu) => {

		const { route, name } = selectedMenu
		const { navigation } = this.props

		navigation.navigate(route, {
			page_title: name
		})
		navigation.dispatch(DrawerActions.toggleDrawer())
	}

	render() {
		const { mainDrawer, currentComponent } = this.state
		const { trans } = this.props.screenProps
		if (mainDrawer)
			return (
				<ScrollView>
					<SideBarHeader navigateToCallback={this.navigateToCallback} />
						<List>
							{
								this.renderMenuList(SideBarMenuItems, trans)
							}
						</List>
				</ScrollView>
			)

		return (
			<ScrollView>
				<SideBarHeader navigateToCallback={this.navigateToCallback} />
                    <TouchableOpacity
                        onPress={this.toggleMainDrawer}
                        style={css.customDrawerTouch}
                    >
					<View style={css.backButtonRow}>
			            <Icon name='ios-arrow-back' />
						
						<Text style={css.backButtonColor}>{trans.t('nav.return')}</Text>
					</View>
				</TouchableOpacity>
				<List>
                    {
                        this.renderSubMenuList(SideBarMenuItems[currentComponent].childrens, trans)
                    }
                </List>
			</ScrollView>
		);
	}
}

export default SideBar;