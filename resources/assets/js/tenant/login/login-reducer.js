const loginReducer = (
    state = {
        loggedIn: {
            id: '',
            fullname: '',
            code: '',
            username: ''
        }
    }, action = {}
)=>{
    let newState = {...state}

    const loginManagement = {
        returnState: returnState,
        SET_LOGGED_IN: setLoggedIn,
        UPDATE_LOGGED_IN_USER: updateLoggedInUser
    }

    function setLoggedIn() {
        newState.loggedIn = action.payload
        return newState
    }

    function updateLoggedInUser() {

        return {
            ...newState,
            loggedIn: {
                ...newState.loggedIn,
                fullname: action.payload.fullname,
                code: action.payload.code,
            }
        }
    }

    function returnState() {
        return newState
    }

    return (loginManagement[action.type] || loginManagement.returnState)(state, action)
}

export default loginReducer