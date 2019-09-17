
import { createDrawerNavigator, createStackNavigator } from 'react-navigation'
import MainComponent from '../../resources/assets/js/tenant/main/components/MainComponent'
import SettingsComponent from '../../resources/assets/js/tenant/settings/components/SettingsComponent'
import MessagesComponent from '../../resources/assets/js/tenant/chat/components/MessagesComponent'
import UsersPageContainer from '../../resources/assets/js/tenant/user/UsersContainer'
import NewUserPageComponent from '../../resources/assets/js/tenant/user/components/NewUserComponent'
import ChangePasswordContaner from '../../resources/assets/js/tenant/settings/change-password/ChangePasswordContainer'
import LanguageContainer from '../../resources/assets/js/tenant/settings/language/LanguageContainer'
import DefaultPage from '../../resources/assets/js/tenant/default'
import SideBar from '../../resources/assets/js/shared/nav/sidebar/SideBar'
import ChatMessageComponent from '../../resources/assets/js/tenant/chat/components/ChatMessageComponent'
import { leftMainHeader, rightMainHeader } from '../../resources/assets/js/shared/nav/Header'
import { getSideBarRouteName, getSeperatedRouteName } from '../../resources/assets/js/shared/nav/HeaderConfig'
import css from '../../resources/assets/js/shared/style/menuStyle'

const StackRoutes = createStackNavigator(
	{
		mainPage: {
			screen: MainComponent,
			navigationOptions: navigation => navigationConfig(navigation)
		},
		DefaultPage: {
			screen: DefaultPage,
			navigationOptions: navigation => navigationConfig(navigation)

		},
		SettingsPage: {
			screen: SettingsComponent,
			navigationOptions: navigation => navigationConfig(navigation)

		},
		MessagesPage: {
			screen: MessagesComponent,
			navigationOptions: navigation => navigationConfig(navigation)

		},
		ChatMessagePage: {
			screen: ChatMessageComponent,
			navigationOptions: navigation => navigationConfig(navigation)

		},
		UsersPage: {
			screen: UsersPageContainer,
			navigationOptions: navigation => navigationConfig(navigation)

		},
		NewUserPage: {
			screen: NewUserPageComponent,
			navigationOptions: navigation => navigationConfig(navigation)

		},
		ChangePasswordPage: {
			screen: ChangePasswordContaner,
			navigationOptions: navigation => navigationConfig(navigation)
		},
		LanguagePage: {
			screen: LanguageContainer,
			navigationOptions: navigation => navigationConfig(navigation)
		}
	},
	{
		defaultNavigationOptions: ({ navigation }) => {
			return {
				headerStyle: css.header,
				headerTitleStyle: css.headerFont,
				headerRight: rightMainHeader(css, navigation),
				headerLeft: leftMainHeader(css, navigation),
			}
		}
	}
)

navigationConfig = ({navigation, screenProps}) => {
	const { params, routeName } = navigation.state
	let { trans } = screenProps
	let headerProperties

	headerProperties = getSeperatedRouteName(css, navigation, routeName, params, trans)

	if (!headerProperties)
		headerProperties = getSideBarRouteName(routeName, trans)

	return headerProperties
}

const SideBarRoute = createDrawerNavigator(
	{
		StackRoutes: {
			screen: StackRoutes
		}
	},
	{
		initialRouteName: 'StackRoutes',
		contentComponent: SideBar
	}
)

export default SideBarRoute