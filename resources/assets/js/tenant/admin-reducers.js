import {combineReducers} from 'redux'
import UserReducer from './user/user-reducer'
import LoginReducer from './login/login-reducer'
import LanguageReducer from './settings/language/language-reducer'

const Reducers = combineReducers({
    user: UserReducer,
    login: LoginReducer,
    language: LanguageReducer
});

export default Reducers


