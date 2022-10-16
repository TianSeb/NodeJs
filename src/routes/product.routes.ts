import { Router } from "express"
import Contenedor from "../db/product.service"
import Producto from "../model/Product"

const dbRoute = 'C:/Users/Usuario1/Desktop/NodeJs/ProgramacionBackend-Ejercicios/src/db/Database'
const db = new Contenedor(dbRoute)

const productsRoute = Router()

productsRoute.get('/', async (req,res) => {
    let products = await db.getAll()
    return res.json({
        data: products
    })
})

productsRoute.get('/:id',async (req,res) => {
    let prodId = parseInt(req.params.id)
    let product = await db.getById(prodId)
    console.log(product);
    
    return res.json({
        data: product
    })
})

productsRoute.post('/',async (req,res) => {
    try {
        let {title, price, url} = req.body
        let product = await db.save(new Producto(undefined,title,price,url))
    
        return res.status(200).send("Product created")
    }
    catch (e){
        console.log(e)
    }
})

productsRoute.put('/:id',async (req,res) => {
    try {
        let prodId = parseInt(req.params.id)
        let product = await db.getById(prodId)
        if(product) {

        }
        else {
            return res.status(400).send("Product not found")
        }

    } catch (error) {
        
    }
})

productsRoute.delete('/:id',async (req,res) => {
    let prodId = parseInt(req.params.id)
    await db.deleteById(prodId)
    return res.status(200).send(`Product with id ${prodId} deleted`)
})

export default productsRoute
