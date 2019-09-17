const languageReducer = (
    state = {
        system: {
            locale: 'en'
        }
    }, action = {}
)=>{
    let newState = {...state}

    const languageManagement = {
        returnState: returnState,
        SET_LOCALE: setLocale,
    }

    function setLocale() {
        newState.system = action.payload
        return newState
    }

    function returnState() {
        return newState
    }

    return (languageManagement[action.type] || languageManagement.returnState)(state, action)
}

export default languageReducer