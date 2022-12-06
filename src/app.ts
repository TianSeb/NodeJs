import { app } from "./server/server"
import { SocketService } from "./service/socket.service"
import { initDb } from "./db/InitSQL"
import mongoDbInit from "./config/MongoInit"

const PORT = 8080

const init = async () => {
    const socketService = new SocketService(app)
    await initDb()
    await mongoDbInit()
    app.listen(PORT, () => {
        console.log(`socketServer listening on port ${PORT}`);
        })

        app.on('error', (err:Error) => {
        console.log('ERROR =>', err);
        })    
}

init()
