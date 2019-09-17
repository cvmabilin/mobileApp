import { createStackNavigator } from 'react-navigation'

import LoginContainer from '../../resources/assets/js/tenant/login/LoginContainer'

const NonSideBarRoute = createStackNavigator(
    {
        login:  {
            screen: LoginContainer,
            
        },
    },
    {
        initialRouteName: 'login',
        defaultNavigationOptions: {
            header: null,
        },
    }
)

export default NonSideBarRoute