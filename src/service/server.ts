import express from 'express'
import { createServer } from "http"
import { lastErrorCatch } from '../utils/errors'
import routes from '../routes/routes'

//--------------------------------------------
//api initialization
const app = express()
const httpServer = createServer(app)

//--------------------------------------------
//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(express.static('public'))
app.set('view engine','ejs')
app.use(routes)
app.use(lastErrorCatch)

export {httpServer as app}