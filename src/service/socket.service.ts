import { Server as ioServer } from "socket.io"
import { Socket as socketType } from 'socket.io'
import { Server as httpServer } from 'http'
import { ProductInstance as productService } from "./product.service"
import { ChatService } from "./chat.service"

export class SocketSevice {
   
    private io: ioServer
    private chatService: ChatService
    
    constructor(app: httpServer) {
        this.initWsServer(app)
        this.eventHandler()
        this.chatService = new ChatService()
    }

    private initWsServer(app: httpServer): void {
        this.io = new ioServer(app, {})
    }

    private eventHandler() : void {
        this.io.on('connection', async (socket:socketType) => {
            console.log('Nuevo cliente conectado')
            socket.emit('mensajes', this.chatService.getAllMsgs())

            socket.on('msgEnviado', (data:string):void => {       
                this.chatService.saveMsg(data)          
                this.io.sockets.emit('mensajes', this.chatService.getAllMsgs())
            })

            // carga inicial de productos
            this.io.emit('productos', 
            await productService.getAll());

            // actualizacion de productos
            socket.on('update', async producto => {
                await productService.save(producto)
                this.io.sockets.emit('productos', productService.getAll())
            })
         })
    }
}