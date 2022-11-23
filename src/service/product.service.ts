import Producto from "../model/Product"
import { prodDatabase } from "../db/DbRepository"

class ProductService {
    createError = require('http-errors')
    productoRepository:any

    constructor() {
        this.productoRepository = prodDatabase
    }

    async create(data:any) {
            try {
                let {title, price, url} = data
                await this.productoRepository.create(new Producto(title, price, url))
            } catch (error) {
                throw this.createError(400, 'Something went wrong with db')
            }
    }

    async update(data:any, id:string) {
        try {
            let checkUpdate = await this.productoRepository.update(data,id)
            if(checkUpdate < 1) throw new Error()

            return `Producto con id:${id} actualizado` 
        } catch (error) {
            throw this.createError(404, 'El producto no existe')
        }
    }

    async get(id?:string){
        try {
            let checkProduct = await this.productoRepository.get(id)
            if(checkProduct.length == 0) throw new Error()

            return (id) ? await this.productoRepository.get(id)
                            : await this.productoRepository.get()
        } catch (error) {
            throw this.createError(404, 'Producto no existe')
        }
    }

    async deleteById(id:string){
        try {
            let checkProduct = await this.productoRepository.delete(id)
            if(checkProduct < 1) throw new Error()

            return `Producto con id:${id} borrado` 
        } catch (error) {
            throw this.createError(404, 'El producto no existe')
        }
    }

    async deleteAll(){
        try {
            await this.productoRepository.delete()
        } catch (error) {
            throw this.createError(404, 'Algo Salio Mal')
        }
    }

}

export default ProductService