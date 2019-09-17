export const changePasswordConstraints = {
    current_password: {
        presence: {
            allowEmpty: false
        }
    },
    new_password: {
        presence: {
            allowEmpty: false
        },
        equality: 'retype_password'
    },
    retype_password: {
        presence: {
            allowEmpty: false
        },
        equality: 'new_password'
    }
}

export const showValidatedFields = (error) => {

    let errorCurrent = false, errorCurrentMessage = '', errorNewPass=false, errorNewPassMessage='', errorRetypePass=false, errorRetypePassMessageMessage=''

    if (!!error) {
        errorCurrent = (!!error.current_password)
        errorCurrentMessage = (errorCurrent) ? error.current_password[0].replace('Current password','') : ''

        errorNewPass = (!!error.new_password)
        errorNewPassMessage = (errorNewPass) ? error.new_password[0].replace('New password','') : ''

        errorRetypePass = (!!error.retype_password)
        errorRetypePassMessageMessage = (errorRetypePass) ? error.retype_password[0].replace('Retype password','') : ''
    }

    return { 
        errorCurrent, errorCurrentMessage, errorNewPass, errorNewPassMessage, errorRetypePass, errorRetypePassMessageMessage
    }
}