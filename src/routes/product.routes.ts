import { Router } from "express"
import Producto from "../model/Product"
import { ProductInstance as ProductService } from "../service/product.service"
const asyncHandler = require('express-async-handler')
const createError = require('http-errors')
const productsRoute = Router()

const productValidation = (req:any,res:any,next:any) => {
    let {title, price, url} = req.body
    if(!title || !price || !url || typeof title !== 'string') throw createError(400,'Datos invalidos');
    next()
}

productsRoute.get('/',asyncHandler(async (req:any,res:any,next:any) => {
    return res.json({
        data: await ProductService.getAll()
    })
}))

productsRoute.get('/:id',asyncHandler(async(req:any,res:any,next:any) => {
        return res.json({
            data: await ProductService.getById(req.params.id)   
        })
}))

productsRoute.post('/',productValidation,asyncHandler(async(req:any,res:any,next:any) => {
        let {title, price, url} = req.body
        return res.status(201).json({
            data: await ProductService.save(new Producto(title,parseInt(price),url))
        })
}))

productsRoute.put('/:id',productValidation,asyncHandler(async(req:any,res:any,next:any) => {
    let {title, price, url} = req.body
    return res.status(201).json({
        data: await ProductService.updateProduct(new Producto(title,price,url),req.params.id)
    })
}))

productsRoute.delete('/:id',asyncHandler(async(req:any,res:any,next:any) => {
    return res.json({
        msg: await ProductService.deleteById(req.params.id)
    })
}))

export default productsRoute
