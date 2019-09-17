import { rightChatHeader } from '../nav/chat/Header'
import { rightUserHeader } from './user/Header'
import { leftBackHeader } from './Header'

const SeperatedRoutes = {
    mainPage: {
        name: trans => trans.t('nav.dashboard')
    },
    SettingsPage: {
        name: trans => trans.t('nav.settings')
    },
    MessagesPage: {
        name: trans => trans.t('nav.messages')
    },
    ChangePasswordPage: { 
        name: trans => trans.t('settings.list.change_password')
    },
    LanguagePage: { 
        name: trans => trans.t('settings.list.language')
    },
    ChatMessagePage: {
        headerProperties: (css, params, navigation) => {
            return {
                headerTitle: params.data.name,
                headerStyle: css.header,
                headerTitleStyle: css.headerFont,
                headerRight: rightChatHeader(css, params),
                headerLeft: leftBackHeader(css, navigation),
            }
        }
    },
    UsersPage: {
        headerProperties: (css, params, navigation, trans) => {
            return {
                headerTitle: trans.t('nav.user_management.users'),
                headerRight: rightUserHeader(css, params, navigation),
            }
        }
    },
    NewUserPage: {
        headerProperties: (css, params, navigation) => {
            let headerTitle = (params.action == 'add') ? 'New Account' : params.data.fullname
            return {
                headerTitle,
                headerLeft: leftBackHeader(css, navigation),
                headerRight: null,
            }
        }
    }
}

export default SeperatedRoutes