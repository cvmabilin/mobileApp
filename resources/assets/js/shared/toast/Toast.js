import { Toast } from 'native-base'

export const showToast = (text, buttonText, type) => {
    Toast.show({
        text: text,
        buttonText: buttonText,
        duration: 3000,
        type: type
    })
}