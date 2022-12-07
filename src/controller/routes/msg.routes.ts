import { Router, Request, Response, NextFunction } from "express"
import { chatService } from "../../service/chat.service"

const asyncHandler = require('express-async-handler')
const msgRoute = Router()

msgRoute.post('/msg',asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    return res.json({
        data: await chatService.saveMsg(req.body)
    })
}))

msgRoute.get('/msg/:id?',asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    return res.json({
        data: await chatService.chatMsgs(req.params.id)
    })
}))

msgRoute.get('/',asyncHandler(async(req:Request,res:Response,next:NextFunction) => {
    res.render('pages/newchat')
}))

export default msgRoute