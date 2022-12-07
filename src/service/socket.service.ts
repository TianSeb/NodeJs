import { Server as ioServer } from "socket.io"
import { Socket as socketType } from 'socket.io'
import { Server as httpServer } from 'http'
import { productService } from "./product.service"
import { chatService } from "./chat.service"
export class SocketService {
   
    private io: ioServer
    private chatService: any
    private productService: any
    
    constructor(app: httpServer) {
        this.initWsServer(app)
        this.eventHandler()
        this.chatService = chatService
        this.productService = productService
    }

    private initWsServer(app: httpServer): void {
        this.io = new ioServer(app, {})
    }

    private eventHandler() : void {
        this.io.on('connection', async (socket:socketType) => {
            console.log('Nuevo cliente conectado')
            socket.emit('mensajes', await this.chatService.chatMsgs())

            socket.on('msgEnviado', async (data:string):Promise<void> => {       
                await this.chatService.saveMsg(data)
                this.io.sockets.emit('mensajes',await this.chatService.chatMsgs())
            })

            // load productos
            socket.emit('productos',
            await this.productService.get());

            // update products
            socket.on('update', async (producto: any) => {
                await this.productService.create(producto)
                let productos = await this.productService.get()
                this.io.sockets.emit('productos',productos)
            })

            //new chat service
            let chatMsgs = await this.chatService.chatMsgs()
            socket.emit('msgChat',chatMsgs)

            socket.on('chatMsgSent', async (data:string):Promise<void> => {       
                await this.chatService.saveMsg(data)
                this.io.sockets.emit('msgChat',await this.chatService.chatMsgs())
            })
         })
    }
}