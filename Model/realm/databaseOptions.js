export const databaseOptions = (table) => {
    return {
        path: 'kadoudb.realm',
        schema: table,

    }
}