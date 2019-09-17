import React from 'react'
import { Button, Left, Right, Icon } from 'native-base'
// import { rightHeaderButtons } from '../Header'

export const rightUserHeader = (css, params, navigation) => {
    return(

        <Right style={ css.rightRow }>
            { 
                // rightHeaderButtons(css, navigation) 
            }

            <Button 
                transparent 
                onPress={() => navigation.navigate('NewUserPage',{
                    action: 'add'
                })}
            >
                <Icon type='Ionicons' name='md-person-add' style={ css.whiteFont } />
            </Button>
        </Right>

    )
}
