export const tenantUsers = {
    name: 'tenants',
    primaryKey: 'id',
    properties: {
        id: 'int',
        code: 'string',
        username: 'string',
        password: 'string',
        first_name: 'string',
        middle_name: 'string',
        last_name: 'string',
        created_at: 'string',
        updated_at: 'string'
    }
}


export const systemSettings = {
    name: 'system',
    properties: {
        id: 'int',
        language: 'string',
    }
}