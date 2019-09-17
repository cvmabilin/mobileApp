import { tenantUsers, systemSettings } from '../../Schema/realm/Schema'
import { databaseOptions } from '../../Model/realm/databaseOptions'
import { comparePassword, hashPassword } from '../../resources/assets/js/shared/sha256/Encryption'
import Realm from 'realm'

class tenantUserController {

    constructor() {
        this.realm = new Realm(databaseOptions([tenantUsers, systemSettings]))
    }

    async userLogin (data) {

        let queryUsers = this.realm.objects('tenants')
        let getUser = queryUsers.filtered(`username = '${data.username}' and code = '${data.code}' `)

        if(getUser.length > 0) {

            let checkPassword = await comparePassword(data.password, getUser[0].password)

            if(checkPassword) 
                return {
                    result: true,
                    fullname: getUser[0].first_name + ' ' + getUser[0].last_name,
                    id: getUser[0].id,
                    code: getUser[0].code,
                    username: getUser[0].username,
                }
                
            return {
                result: false
            }
        }

        return {
            result: false
        }
    }


    getUsers = () => {
        let data = []
        let users = this.realm.objects('tenants')

        for (let item of users) {
            item.fullname = item.first_name + ' ' + item.last_name
            data.push(item)
        }

        return data
    }

    async changePassword (data) {
        try {

            let hashed = await hashPassword(data.new_password)

            this.realm.write(() => {
                let findUser = this.realm.objects('tenants').filtered(`id = ${data.id}`)
                findUser[0].password = hashed
            })

            return {
                result: true
            }

        }catch (err) {
            return {
                result: false,
                message: err.message
            }
        }
    }

    updateUser = (data) => {

        try {

            this.realm.write(() => {
                let findUser = this.realm.objects('tenants').filtered(`id = ${data.id}`)
                findUser[0].code = data.code
                findUser[0].first_name = data.first_name
                findUser[0].middle_name = data.middle_name
                findUser[0].last_name = data.last_name
                findUser[0].updated_at = new Date().toISOString()
            })

            return {
                result: true
            }

        }catch (err) {
            return {
                result: false,
                message: err.message
            }
        }

    }

    deleteUser = (id) => {

        try {

            this.realm.write(() => {
                let findUser = this.realm.objects('tenants').filtered(`id = ${id}`)
                this.realm.delete(findUser)
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


    async saveUser (data) {

        let checkUsername = this.realm.objects('tenants').filtered(`username = '${data.username}' `)

        if (checkUsername.length > 0)
            return { result: false, message: 'Username already exist.' }
    
        try {
            let hashed = await hashPassword(data.password)

            this.realm.write(() => {
                this.realm.create('tenants', {
                    id: Date.now(),
                    code: data.code,
                    username: data.username,
                    password: hashed,
                    first_name: data.first_name,
                    middle_name: data.middle_name,
                    last_name: data.last_name,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
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

};

export default new tenantUserController()

