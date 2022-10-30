import { Server, Socket } from "socket.io"
import { ProductInstance as productService } from "./product.service"
import { ChatService } from "./chat.service"

let io : any
const chatService = new ChatService()

const initWsServer = (server:any) => {
    io = new Server(server)
        io.on('connection',async (socket:Socket) => {
            console.log('Nuevo cliente conectado')
            
            socket.emit('mensajes', chatService.getAllMsgs())

            socket.on('msgEnviado', data => {       
                chatService.saveMsg(data)          
                io.sockets.emit('mensajes', chatService.getAllMsgs())
            })

            // carga inicial de productos
            io.emit('productos', await productService.getAll());

            // actualizacion de productos
            socket.on('update', async producto => {
                await productService.save(producto)
                io.sockets.emit('productos', productService.getAll())
        })
    })
}

const getWsServer = () => {
    return io
}

export { initWsServer, getWsServer }