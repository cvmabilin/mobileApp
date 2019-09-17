import { tenantUsers, systemSettings } from '../../Schema/realm/Schema'
import { databaseOptions } from '../../Model/realm/databaseOptions'
import Realm from 'realm'

class systemSettingsController {

    constructor() {
        this.realm = new Realm(databaseOptions([tenantUsers, systemSettings]))
    }

    changeLocale = (lang) => {
        try {

            this.realm.write(() => {
                let systemSettings = this.realm.objects('system').filtered(`id = 1`)
                systemSettings[0].language = lang
            })

            return {
                result: true
            }

        } catch(err) {
            return {
                result: false,
                message: err.message
            }
        }
    }

    setLocale = () => {
        try {

            this.realm.write(() => {
                this.realm.create('system', {
                    id: 1,
                    language: 'en'
                })
            })

            return {
                result: true
            }

        } catch(err) {
            return {
                result: false,
                message: err.message
            }
        }
    }

    getLocale = () => {
        let locale = this.realm.objects('system').filtered(`id = 1`)

        if (locale.length == 0)
            return 'en'

        return locale[0].language
    }

}

export default new systemSettingsController()

