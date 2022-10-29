import { ProductInstance as ProductService } from "../service/product.service"
import Producto from "../model/Product"

let productos: string | any[] = []

//this function is for initializing db in case of empty || no file
const getDb = async () => {
    try {
        productos = await ProductService.getAll()
        
        if(productos.length === 0) {
            console.log('Saving Products')
            await ProductService.save(new Producto('mayonesa',200,'https://cdn3.iconfinder.com/data/icons/food-and-beverages-7/64/03_chicken_fries_thigh_food-512.png'))
            await ProductService.save(new Producto('mostaza',400,'https://cdn3.iconfinder.com/data/icons/food-and-beverages-7/64/09_juice_drink_beverages_orange-512.png'))
            await ProductService.save(new Producto('kechu',500,'https://cdn3.iconfinder.com/data/icons/food-and-beverages-7/64/20_hot_dog_sussage_food-512.png'))
        }
        else return ProductService

    } catch (error) {
        console.log('Error Loading Container || Products');
    }
}

export default getDb