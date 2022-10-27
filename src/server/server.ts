import express from 'express'
import { Request, Response, NextFunction } from 'express'
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import routes from '../routes/routes'
import getDb from "../db/getDB"
import { ProductInstance as productService } from "../service/product.service"


//--------------------------------------------
//sever, socket and api initialization
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer)

//--------------------------------------------
//middlewares
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

//-------------------------------------------- 
// Initializing DB
getDb()

//--------------------------------------------
// configuro el socket
io.on('connection', async (socket:Socket) => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de productos
    socket.emit('productos', await productService.getAll());

    // actualizacion de productos
    socket.on('update', producto => {
        productService.save(producto)
        .then()
        io.sockets.emit('productos', productService.getAll())
    })
});

export {httpServer as server}