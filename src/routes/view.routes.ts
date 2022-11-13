import { Router, Request, Response, NextFunction } from "express"
import ProductService from "../service/product.service"
import productsRoute from "./product.routes"

const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const routes = Router()
const productService = new ProductService()

routes.use('/api/productos',productsRoute)

const productValidation = (req:Request,res:Response,next:NextFunction) => {    
    let {title, price, url} = req.body
    if(!title || !price || !url || typeof title !== 'string') throw createError(400,'Datos invalidos');
    next()
}

routes.get('/', (req:Request, res:Response) => {
    res.render('pages/index')
})

routes.get('/productos', asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    const productos = await productService.get("")
    console.log(productos)
    res.render('pages/products',{productos})
}))

routes.post('/productos',productValidation, asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    await productService.create(req.body)
    res.redirect(302,'/')
}))

export default routes
