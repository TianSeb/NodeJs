import knex from "knex";
import dbConfig from './knexfile'

class Database {

    connection:any
    tableName:string
    
    constructor(config:any, tableName:string) {
        const environment = 'development'
        console.log(`INITIALIZING ${environment} DB`)
        // const options:= config[environment]
        this.connection = knex(config)
        this.tableName = tableName
        console.log('termine de crear las cosas del constructor db');
        
    }

    create(data:any) {
        return this.connection(this.tableName).insert(data)
    }

    update(data:any, id:string) {
        return this.connection(this.tableName).where('id',id).update(data)
    }

    get(id?:string){
        console.log('estoy en el get de la db')
        return (id) ? this.connection(this.tableName).where('id',id)
                            : this.connection(this.tableName)
    }

    delete(id?:string){
        return (id) ? this.connection(this.tableName).where('id',id).del()
                            : this.connection(this.tableName).del()
    }
}

const prodDatabase = new Database(dbConfig.development,'productos')
const chatDatabase = new Database(dbConfig.development,'chat')

module.exports = {
    prodDatabase,
    chatDatabase
}
