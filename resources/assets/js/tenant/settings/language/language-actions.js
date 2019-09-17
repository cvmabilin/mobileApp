import systemSettingsController from '../../../../../../Controller/realm/systemSettingsController'

export const changeLanguage = (lang) => dispatch => {

    systemSettingsController.changeLocale(lang)
    let language = { locale: lang }

    dispatch({
        type: 'SET_LOCALE',
        payload: language
    })
}
