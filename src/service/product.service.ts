import Producto from "../model/Product"
const database = require("../db/Database")

class ProductService {
    createError = require('http-errors')
    productoRepository:any

    constructor() {
        this.productoRepository = database.prodDatabase
    }

    async create(data:any) {
            try {
                let {title, price, url} = data
                let newProduct = new Producto(title, price, url)

                return await this.productoRepository.create(newProduct)
            } catch (error) {
                throw this.createError(400, 'Something went wrong with db')
            }
    }

    async update(data:any, id:string) {
        try {
            return await this.productoRepository.update(data,id)
        } catch (error) {
            throw this.createError(404, 'El producto no existe')
        }
    }

    async get(id?:string){
        try {
            return (id) ? await this.productoRepository.get('id',id)
                            : await this.productoRepository.get("")
        } catch (error) {
            throw this.createError(404, 'Producto no existe')
        }
    }

    async deleteById(id?:string){
        try {
            return await this.productoRepository.delete(id)
        } catch (error) {
            throw this.createError(404, 'El producto no existe')
        }
    }
}

export default ProductService