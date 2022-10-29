import { Server, Socket } from "socket.io"
import { ProductInstance as productService } from "./product.service"
import { ChatService } from "./chat.service"

class SocketService {

    chatService : ChatService = new ChatService()
    io : Server
    constructor(server:any){
        this.io = new Server(server)
    }

    async initWsServer () {
        this.io.on('connection',async (socket:Socket) => {
            console.log('Nuevo cliente conectado')
            
            socket.on('msgEnviado', async data => { 
                const {userEmail, msg} = data //toDo validar datos
                this.io.sockets.emit('msgGuardado', this.chatService.saveMsg(data))
            })












            // // carga inicial de productos
            // this.io.emit('productos', await productService.getAll());
    
            // // actualizacion de productos
            // socket.on('update', async producto => {
            //     await productService.save(producto)
            //     this.io.sockets.emit('productos', productService.getAll())
            // })
        })
    }
    
    async getWsServer () {
        return this.io
    }
}

export { SocketService }