import Producto from "../model/Product"

class ProductService {
    fileName: string
    fs = require("fs")
    createError = require('http-errors')
    path = require('path')
    dbPath = this.path.resolve(__dirname, '../db/Database')

    constructor() {
        this.fileName = `${this.dbPath}.json`
        if(!this.fs.existsSync(this.fileName)){
            this.fs.writeFileSync(this.fileName,'[]')
        }
    }

    async save(obj:Producto) {
            try {
                let container = await this.getDatabase()
                container.push(obj)
                await this.saveProducts(container)
                
                return obj
            } catch (error) {
                throw this.createError(400, 'Something went wrong with db')
            }
    }

    async updateProduct(product:any, id:string) {
        try {
            let objIndex = await this.objectExists(id)  
            if(objIndex < 0) throw Error

            let container = await this.getDatabase()
            let dbProduct  = container[objIndex]

            dbProduct._title = product.title || dbProduct._title
            dbProduct._price = parseInt(product.price) || dbProduct._price
            dbProduct._url = product.url || dbProduct._url
            dbProduct._id = id

            await this.saveProducts(container)
            return `Object with id ${id} updated`

        } catch (error) {
            throw this.createError(404, 'El producto no existe')
        }
    }

    async getById(id:string){
        try {
            let container = await this.getDatabase()
            let objectFound = await this.objectExists(id)

            if(objectFound < 0) throw Error

            return container[objectFound]
        } catch (error) {
            throw this.createError(404, 'Producto no existe')
        }
    }

    async getAll(){
        try {
            let container = await this.getDatabase()
            return container
        } catch (error) {
            throw this.createError(400, 'Something went wrong with db')
        }
    }

    async deleteById(id:string){
        try {
            let objectIndex = await this.objectExists(id)
            if(objectIndex < 0) throw Error

            let container = await this.getDatabase()
            container.splice(objectIndex,1)
            await this.saveProducts(container)
        } catch (error) {
            throw this.createError(404, 'El producto no existe')
        }
    }

    async deleteAll(){
        try {
            await this.saveProducts([])
        } catch (error) {
            throw this.createError(400, 'Something went wrong with db')
        }
    }

    private async objectExists(id:string){
        let container = await this.getDatabase()
        let objIndex = container.findIndex((obj:any) => obj._id === id)

        return objIndex 
    }

    private async getDatabase() {
        try {
           let database = await this.fs.promises.readFile(this.fileName,'utf-8')
           let container = []
            if(database === "") {
                database = await this.fs.promises.writeFile(this.fileName,'[]')
            } else {
                container = JSON.parse(database) 
            }
            return container
        } catch (error) {
            throw this.createError(400, 'Something went wrong with db')    
        }
    }

    private async saveProducts(data: Array<Producto>) {
        await this.fs.promises.writeFile(this.fileName, JSON.stringify(data,null,'\t'))
    }
}

export const ProductInstance = new ProductService()