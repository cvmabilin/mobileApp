
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import SideBarRoute from './side-bar/SideBarRoute'
import NonSideBarRoute from './non-side-bar/NonSideBarRoute'


const Routes = createAppContainer(
    createSwitchNavigator(
        {
            NonSideBarRoute,
            SideBarRoute,
        },
        {
            initialRouteName: 'NonSideBarRoute'
        }
    )
)

export default Routes