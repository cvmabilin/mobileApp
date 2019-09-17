const userReducer = (
    state = {
        data: [],
        searchedData: []
    }, action = {}
)=>{
    let newState = {...state}

    const userManagement = {
        returnState: returnState,
        GET_USERS: getUsers,
        SEARCH_USERS: searchUsers,
    }

    function getUsers () {
        newState.data = action.payload
        newState.searchedData = action.payload
        return newState
    }

    function searchUsers () {
   
        newState.data = action.payload

        return newState
    }

    function returnState () {
        return newState
    }

    return (userManagement[action.type] || userManagement.returnState)(state, action)
}

export default userReducer

