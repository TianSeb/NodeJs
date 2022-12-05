import express from 'express'
import morgan from 'morgan'
import { createServer } from "http"
import { lastErrorCatch } from '../utils/Utils'
import routes from '../controller/routes/view.routes'

//--------------------------------------------
//api initialization
const app = express()
const httpServer = createServer(app)

//--------------------------------------------
//middlewares
app.set('view engine','ejs')
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))
app.use(morgan('dev'))
app.use(routes)
app.use(lastErrorCatch)

export {httpServer as app}