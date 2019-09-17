import SideBarMenuItems from './sidebar/components/SideBarMenuItems'
import SeperatedRoutes from './SeperatedRoutes'

export const getSeperatedRouteName = (css, navigation, routeName, params, trans) => {

    for (let routeKey in SeperatedRoutes) {

        if (routeName == routeKey) {
  
            if(SeperatedRoutes[routeKey].hasOwnProperty('headerProperties')) 
                return SeperatedRoutes[routeKey].headerProperties(css, params, navigation, trans)
    
            return {
                headerTitle: SeperatedRoutes[routeKey].name(trans)
            }
        }
  
    }
    return false
}
  
export const getSideBarRouteName = (routeName, trans) => {
      
    for (let routeKey in SideBarMenuItems) {
  
        if ( SideBarMenuItems[routeKey].route == routeName )
            return {
                headerTitle: SideBarMenuItems[routeKey].name(trans)
            }

        if( SideBarMenuItems[routeKey].hasOwnProperty('childrens') ) {
            let childrenRoutes = SideBarMenuItems[routeKey].childrens

            let findChildRoute = childrenRoutes.find(list => list.route == routeName )

            if (findChildRoute) 
                return { 
                    headerTitle: findChildRoute.name(trans)
                }

        }
    }
}