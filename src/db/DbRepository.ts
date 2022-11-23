import knex from "knex";
import dbConfig from './knexfile'

class DbRepository {

    connection:any
    tableName:string
    
    constructor(tableName:string) {
        const environment = 'development'
        console.log(`INITIALIZING ${environment} DB`)
        const options = dbConfig[environment]
        this.connection = knex(options)
        this.tableName = tableName        
    }

    create(data:any) {
        return this.connection(this.tableName).insert(data)
    }

    update(data:any, id:string) {
        return this.connection(this.tableName).where('id',id).update(data)
    }

    get(id?:string){
        return (id) ? this.connection(this.tableName).where('id',id)
                            : this.connection(this.tableName)
    }

    delete(id?:string){
        return (id) ? this.connection(this.tableName).where('id',id).del()
                            : this.connection(this.tableName).del()
    }
}

export const prodDatabase = new DbRepository('productos')
export const chatDatabase = new DbRepository('chat')
