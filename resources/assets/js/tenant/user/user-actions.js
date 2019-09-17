import tenantUserController from '../../../../../Controller/realm/tenantUserController'
import { showToast } from '../../shared/toast/Toast'
import { alertAfterTransac } from '../../shared/alert/AlertMessage'

function checkResult (output, message, dispatch) {

    if (output.result) 
        return alertAfterTransac('Success', message, () => {
            dispatch({
                type: 'GET_USERS',
                payload: tenantUserController.getUsers()
            })
        })

    return showToast('Error: '+output.message,'Okay','danger')
}

export const searchUsers = (data, search) => {

    return (dispatch) => {

        const searchResult = data.filter( (item) => {
 
            const itemData = item.fullname ? item.fullname.toUpperCase() : ''.toUpperCase()
            const textData = search.toUpperCase()

            return itemData.indexOf(textData) > -1
        })

        dispatch({
            type: 'SEARCH_USERS',
            payload: searchResult
        })
    }
}

export const getUsers = () => {

    return (dispatch) => {
        let users = tenantUserController.getUsers()

        dispatch({
            type: 'GET_USERS',
            payload: users
        })
    }
}

export const updateUser = (data, returnToUsers) => async dispatch => {

    let updateData = await tenantUserController.updateUser(data)

    checkResult(updateData, 'User information has been updated.', dispatch)
    
    if (updateData.result) {
        if (data.id == data.loggedId)
            dispatch({
                type: 'UPDATE_LOGGED_IN_USER',
                payload: { code: data.code, fullname: data.first_name + ' ' + data.last_name }
            })

        returnToUsers()
    }
        
}

export const saveUser = (data, returnToUsers) => async dispatch => {

    let saveData = await tenantUserController.saveUser(data)

    checkResult(saveData, 'New user account has been created.', dispatch)

    if (saveData.result)
        returnToUsers()
}

export const deleteUser = (id, returnToUsers) => {

    return (dispatch) => {

        let deleteData = tenantUserController.deleteUser(id)

        checkResult(deleteData, 'User has been deleted.', dispatch)

        if (typeof returnToUsers === 'function')
            returnToUsers()
    }
}
