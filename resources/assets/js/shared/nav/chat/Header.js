import React from 'react';
import { Button, Right, Icon } from 'native-base';
import { alertMessage } from '../../../shared/alert/AlertMessage'

export const rightChatHeader = (css, params) => {
  const { name } = params.data
  return(
      <Right style={ css.rightRow }>
        <Button 
          transparent
          onPress={ () => alertMessage('Lock', 'Are you sure you want to Lock '+name+'?') }
        >
          <Icon name='ios-lock' style={ css.whiteFont } />
        </Button>
        <Button 
          transparent 
          onPress={ () => alertMessage('Block','Are you sure you want to Block '+name+'?') }
        >
          <Icon type='MaterialIcons' name='block' style={ css.whiteFont } />
        </Button>
      </Right>
  )
}

