import { ProductInstance as ProductService } from "../service/product.service"
import Producto from "../model/Product"

let productos: string | any[] = []

//this function is for initializing db in case of empty || no file
const getDb = async () => {
    try {
        productos = await ProductService.getAll()
        
        if(productos.length === 0) {
            console.log('Saving Products')
            await ProductService.save(new Producto('mayonesa',200,'https://www.iconfinder.com/icons/3392469/chicken_food_fries_thigh_icon'))
            await ProductService.save(new Producto('mostaza',400,'https://www.iconfinder.com/icons/3392483/beverages_drink_juice_orange_icon'))
            await ProductService.save(new Producto('kechu',500,'https://www.iconfinder.com/icons/3392472/food_sussage_hot%20dog_icon'))
        }
        else return ProductService

    } catch (error) {
        console.log('Error Loading Container || Products');
    }
}

export default getDb