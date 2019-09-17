import tenantUserController from '../../../../../Controller/realm/tenantUserController'
import { showToast } from '../../shared/toast/Toast'

export const userLogin = (data, navigation) => async dispatch => {

    let getUser = await tenantUserController.userLogin(data)

    if (!getUser.result)
        return showToast('Invalid Credentials', 'Okay', 'danger')

    const user = {
        fullname: getUser.fullname,
        id: getUser.id,
        code: getUser.code,
        username: getUser.username,
    }

    dispatch({
        type: 'SET_LOGGED_IN',
        payload: user
    })

    return navigation.navigate('mainPage')
}
