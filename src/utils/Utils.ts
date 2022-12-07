import { Request, Response, NextFunction } from 'express'
import Producto from '../model/product/Product'
import { faker } from '@faker-js/faker';
import { ChatMessage } from '../model/msg/ChatMessage';

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

const msgGenerator = (qty:string) : Array<ChatMessage> => {
    let i:number
    let chatMsgs:Array<ChatMessage> = []
    let msg:ChatMessage
    let max = parseInt(qty)
    
    for(i = 0; i < max; i++) {
        msg = new ChatMessage(
            faker.lorem.sentences(3),
            new ChatMessage.Author(
                faker.internet.email(),
                faker.name.firstName(),
                faker.name.lastName(),
                faker.datatype.number(80).toString(),
                faker.random.word(),
                faker.internet.url()
            )
        )
        chatMsgs.push(msg)
    }
    return chatMsgs
}

export { lastErrorCatch, productGenerator, msgGenerator }