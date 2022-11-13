import knex from "knex";
import dbConfig from './knexfile'

class Database {

    connection:any
    
    constructor() {
        const environment = 'development'
        console.log(`INITIALIZING ${environment} DB`)
        const options = dbConfig[environment]
        this.connection = knex(options)
    }
}

export const dbConnection = new Database()
