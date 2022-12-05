import { Router, Request, Response, NextFunction } from "express"
import { productGenerator } from "../../utils/Utils"

const fakerRoutes = Router()

fakerRoutes.get('/',(req:Request,res:Response,next:NextFunction) => {
    let qty:any = req.query.qty

    return res.json({
        data: productGenerator(qty)
    })
})

export default fakerRoutes