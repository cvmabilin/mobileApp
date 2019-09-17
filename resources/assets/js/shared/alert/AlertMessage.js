import { Alert } from 'react-native'

export function alertMessage(title, message) {
    Alert
        .alert(
            title + ' Confirmation',
            message,
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Yes', onPress: () => console.log('OK Pressed'),
                    },
                ],
            {
                cancelable: false
            },
        )
}


export function alertAfterTransac(title, message, functionProcess) {
    Alert
        .alert(
            title,
            message,
                [
                    {
                        text: 'OK', onPress: () => functionProcess(),
                    },
                ],
            {
                cancelable: false
            },
        )
}

export function alertMessageConfirmation(title, message, functionProcess) {
    Alert
        .alert(
            title,
            message,
                [
                    {
                        text: 'Cancel',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                    {
                        text: 'Yes', onPress: () => functionProcess(),
                    },
                ],
            {
                cancelable: false
            },
        )
}