import React, { Fragment } from 'react'
import { Button, Left, Right, Icon } from 'native-base'
import { DrawerActions } from 'react-navigation-drawer'


export const rightHeaderButtons = (css, navigation) => {
  return(
    <Fragment>
      <Button 
          transparent
          onPress={() => navigation.navigate('MessagesPage')}
        >
          <Icon name='ios-chatboxes' style={ css.whiteFont } />
      </Button>
      <Button 
        transparent 
        onPress={() => navigation.navigate('SettingsPage')}
      >
        <Icon type='MaterialIcons' name='settings' style={ css.whiteFont } />
      </Button>
    </Fragment>
    
  )
}

export const rightMainHeader = (css, navigation) => {
  return(
    <Right style={ css.rightRow }>
      { rightHeaderButtons(css, navigation) }
    </Right>
  )
}

export const leftMainHeader = (css, navigation) => {
  return(
    <Left>
      <Button 
        transparent
          onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer()) }
        >
        <Icon name='menu' style={ css.whiteFont } />
      </Button>
    </Left>
  )
}


export const leftBackHeader = (css, navigation) => {
  return(

      <Left >

          <Button 
              transparent 
              onPress={() => navigation.goBack()}
          >
              <Icon type='Ionicons' name='ios-arrow-back' style={ css.whiteFont } />
          </Button>
      </Left>

  )
}
