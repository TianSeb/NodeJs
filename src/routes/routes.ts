import { Router, Request, Response, NextFunction } from "express"
import { ProductInstance as productService } from "../service/product.service"
import productsRoute from "./product.routes"
import Producto from "../model/Product"

const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const routes = Router()

routes.use('/api/productos',productsRoute)

// Rutas clase 10 //
const productValidation = (req:Request,res:Response,next:NextFunction) => {    
    let {title, price, url} = req.body
    if(!title || !price || !url || typeof title !== 'string') throw createError(400,'Datos invalidos');
    next()
}

routes.get('/',(req:Request, res:Response) => {
    res.render('pages/index')

})

routes.get('/productos',asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    const productos = await productService.getAll()
    res.render('pages/products',{productos})
}))

routes.post('/productos',productValidation,asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    let {title, price, url} = req.body
    await productService.save(new Producto(title,price,url))
    res.redirect(302,'/')
}))

export default routes
