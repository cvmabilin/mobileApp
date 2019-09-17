import tenantUserController from '../../../../../Controller/realm/tenantUserController'
import { showToast } from '../../shared/toast/Toast'
import { alertAfterTransac } from '../../shared/alert/AlertMessage'

function checkResult (output, message, dispatch, trans) {

    if (output.result) 
        return alertAfterTransac(trans.t('new_users.form.validation.success'), message, () => {
            dispatch({
                type: 'GET_USERS',
                payload: tenantUserController.getUsers()
            })
        })

    return showToast(trans.t('new_users.form.validation.error') +output.message,trans.t('new_users.form.validation.ok'),'danger')
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

export const updateUser = (data, returnToUsers, trans) => async dispatch => {

    let updateData = await tenantUserController.updateUser(data)

    checkResult(updateData, trans.t('new_users.form.validation.updated'), dispatch, trans)
    
    if (updateData.result) {
        if (data.id == data.loggedId)
            dispatch({
                type: 'UPDATE_LOGGED_IN_USER',
                payload: { code: data.code, fullname: data.first_name + ' ' + data.last_name }
            })

        returnToUsers()
    }
        
}

export const saveUser = (data, returnToUsers, trans) => async dispatch => {

    let saveData = await tenantUserController.saveUser(data)

    checkResult(saveData, trans.t('new_users.form.validation.saved'), dispatch, trans)

    if (saveData.result)
        returnToUsers()
}

export const deleteUser = (id, returnToUsers, trans) => {

    return (dispatch) => {

        let deleteData = tenantUserController.deleteUser(id)

        checkResult(deleteData, trans.t('new_users.form.validation.deleted'), dispatch, trans)

        if (typeof returnToUsers === 'function')
            returnToUsers()
    }
}
