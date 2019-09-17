export const newUserConstraints = {
    code: {
        presence: {
            allowEmpty: false
        }
    },
    username: {
        presence: {
            allowEmpty: false
        }
    },
    first_name: {
        presence: {
            allowEmpty: false
        }
    },
    last_name: {
        presence: {
            allowEmpty: false
        }
    },
    password: {
        presence: {
            allowEmpty: false
        },
        equality: 'confirmPassword'
    },
    confirmPassword: {
        presence: {
            allowEmpty: false
        },
        equality: 'password'
    }
}

export const editUserConstraints = {
    code: {
        presence: {
            allowEmpty: false
        }
    },
    first_name: {
        presence: {
            allowEmpty: false
        }
    },
    last_name: {
        presence: {
            allowEmpty: false
        }
    },
}


export const showValidatedFields = (action, error) => {
    let errorCode = false, errorCodeMessage = '', errorUser=false, errorUserMessage='', errorFirst=false, errorFirstMessage='', 
        errorLast=false, errorLastMessage='', errorPass=false, errorPassMessage='', errorConPass=false, errorConPassMessage=''

    if (action == 'add' && !!error) {
        errorCode = (!!error.code)
        errorCodeMessage = (errorCode) ? error.code[0].replace('Code','') : ''

        errorUser = (!!error.username)
        errorUserMessage = (errorUser) ? error.username[0].replace('Username','') : ''

        errorFirst = (!!error.first_name)
        errorFirstMessage = (errorFirst) ? error.first_name[0].replace('First name','') : ''

        errorLast = (!!error.last_name)
        errorLastMessage = (errorLast) ? error.last_name[0].replace('Last name','') : ''

        errorPass = (!!error.password)
        errorPassMessage = (errorPass) ? error.password[0].replace('Password','') : ''

        errorConPass = (!!error.confirmPassword)
        errorConPassMessage = (errorConPass) ? error.confirmPassword[0].replace('Confirm password','') : ''
    }

    if (action == 'edit' && !!error) {
        errorCode = (!!error.code)
        errorCodeMessage = (errorCode) ? error.code[0].replace('Code','') : ''

        errorFirst = (!!error.first_name)
        errorFirstMessage = (errorFirst) ? error.first_name[0].replace('First name','') : ''

        errorLast = (!!error.last_name)
        errorLastMessage = (errorLast) ? error.last_name[0].replace('Last name','') : ''
    }

    return { 
        errorCode, errorCodeMessage, errorUser, errorUserMessage, errorFirst, errorFirstMessage,
        errorLast, errorLastMessage, errorPass, errorPassMessage, errorConPass, errorConPassMessage 
    }
}