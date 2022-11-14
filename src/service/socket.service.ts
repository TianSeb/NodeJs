import { Server as ioServer } from "socket.io"
import { Socket as socketType } from 'socket.io'
import { Server as httpServer } from 'http'
import ProductService from './product.service'
import ChatService from './chat.service'

export class SocketSevice {
   
    private io: ioServer
    private chatService: ChatService
    private productService: ProductService
    
    constructor(app: httpServer) {
        this.initWsServer(app)
        this.eventHandler()
        this.chatService = new ChatService()
        this.productService = new ProductService()
    }

    private initWsServer(app: httpServer): void {
        this.io = new ioServer(app, {})
    }

    private eventHandler() : void {
        this.io.on('connection', async (socket:socketType) => {
            console.log('Nuevo cliente conectado')
            socket.emit('mensajes', await this.chatService.getAllMsgs())

            socket.on('msgEnviado', async (data:string):Promise<void> => {       
                this.chatService.saveMsg(data)
                this.io.sockets.emit('mensajes',await this.chatService.getAllMsgs())
            })

            // carga inicial de productos
            socket.emit('productos',
            await this.productService.get());

            // actualizacion de productos
            socket.on('update', async (producto: any) => {
                await this.productService.create(producto)
                let productos = await this.productService.get()
                this.io.sockets.emit('productos',productos)
            })
         })
    }
}