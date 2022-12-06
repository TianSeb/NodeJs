import { Router, Request, Response, NextFunction } from "express"
import { productService } from "../../service/product.service"
const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const productsRoute = Router()

const productValidation = (req:Request,res:Response,next:NextFunction) => {    
    let {title, price, url} = req.body
    if(!title || !price || !url || typeof title !== 'string') throw createError(400,'Datos invalidos');
    next()
}

productsRoute.get('/:id?',asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
        return res.json({
            data: await productService.get(req.params.id)   
        })
}))

productsRoute.post('/',productValidation,asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
        return res.json({
            data: await productService.create(req.body)
        })
}))

productsRoute.put('/:id',asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    return res.json({
        data: await productService.update(req.body,req.params.id)
    })
}))

productsRoute.delete('/:id',asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    return res.json({
        msg: await productService.deleteById(req.params.id)
    })
}))

productsRoute.delete('/',asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    return res.json({
        msg: await productService.deleteAll()
    })
}))

export default productsRoute
