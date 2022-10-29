import express from 'express'
import { Request, Response, NextFunction } from 'express'
import routes from '../routes/routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))
app.use(routes)
app.set('view engine','ejs')

app.use((err:any, req:Request,res:Response,next:NextFunction) => {
    const status = err.status || 500;
    const message = err.message || 'Internal Server Error';

    res.status(status).json({
        message,
    })
});

export {app as server}