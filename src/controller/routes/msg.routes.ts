import { Router, Request, Response, NextFunction } from "express"
import { chatService } from "../../service/chat.service"

const asyncHandler = require('express-async-handler')
const msgRoute = Router()

msgRoute.get('/',asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    res.render('pages/newchat')
}))

msgRoute.post('/msg',asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    return res.json({
        data: await chatService.saveMsg(req.body)
    })
}))

msgRoute.get('/normalize',asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    return res.json({
        data: await chatService.normalize()
    })
}))

msgRoute.get('/denormalize',asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    return res.json({
        data: await chatService.denormalize()
    })
}))


export default msgRoute