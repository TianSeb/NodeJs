import Contenedor from "./product.service"
import Producto from "../model/Product"

const path = require('path')
const route = path.resolve(__dirname, './Database')

const contenedor = new Contenedor(route)
let productos: string | any[] = []

const getDb = async () => {
    try {
        productos = await contenedor.getAll()
        
        if(productos.length === 0) {
            console.log('Saving Products')
            await contenedor.save(new Producto(undefined,'mayonesa',200,'www.elMorza.com'))
            await contenedor.save(new Producto(undefined,'mostaza',400,'www.elMorza.com'))
            await contenedor.save(new Producto(undefined,'kechu',500,'www.elMorza.com'))
        }
        else return contenedor

    } catch (error) {
        console.log('Error Loading Container || Products');
    }
}

export default getDb