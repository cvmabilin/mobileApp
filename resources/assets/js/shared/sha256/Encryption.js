import { sha256 } from 'react-native-sha256'

export const hashPassword = async (password) => {
    return await sha256(password)
}

export const comparePassword = async (password, hashedPassword) => {

    let hash = await sha256(password)

    return (hash == hashedPassword)
}