import { Request, Response, NextFunction } from 'express'
import Producto from '../model/Product'
import { faker } from '@faker-js/faker';

const lastErrorCatch = ((err:any, req:Request,res:Response,next:NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
})

const productGenerator = (qty:string) : Array<Producto> => {
    let i:number
    let productos:Array<Producto> = []
    let producto:Producto
    let max = parseInt(qty)
    
    for(i = 0; i < max; i++) {
        producto = new Producto(
            faker.commerce.productName(),
            parseInt(faker.commerce.price()),
            faker.image.imageUrl()
        )
        productos.push(producto)
    }
    return productos
}

export { lastErrorCatch, productGenerator }