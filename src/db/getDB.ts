import { ProductInstance as ProductService } from "../service/product.service"
import Producto from "../model/Product"

let productos: string | any[] = []

//this function is for initializing db in case of empty || no file
const getDb = async () => {
    try {
        productos = await ProductService.getAll()
        
        if(productos.length === 0) {
            console.log('Saving Products')
            await ProductService.save(new Producto('mayonesa',200,'www.elMorza.com'))
            await ProductService.save(new Producto('mostaza',400,'www.elMorza.com'))
            await ProductService.save(new Producto('kechu',500,'www.elMorza.com'))
        }
        else return ProductService

    } catch (error) {
        console.log('Error Loading Container || Products');
    }
}

export default getDb