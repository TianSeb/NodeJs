import { app } from "./server/server"
import { SocketSevice } from "./service/socket.service"
import { initDb } from './db/InitDB'

const PORT = 8080

const init = async () => {
    const socketService = new SocketSevice(app)
    await initDb()
    app.listen(PORT, () => {
        console.log(`socketServer listening on port ${PORT}`);
        })

        app.on('error', (err:Error) => {
        console.log('ERROR =>', err);
        })    
}

init()
