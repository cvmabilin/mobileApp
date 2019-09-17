import i18n from 'i18n-js'

import en from '../../locales/en/en'
import jp from '../../locales/jp/jp'
import systemSettingsController from '../../../Controller/realm/systemSettingsController'

i18n.defaultLocale = 'en'
i18n.locale = systemSettingsController.getLocale()
i18n.fallbacks = true
i18n.translations = { en, jp }

export default i18n