import { app } from "./service/server"
import { SocketService } from "./service/socket.service"
import getDb from "./db/getDB"

const PORT = 8080
const socketServer = new SocketService(app)

//------------------------
//Init socket Server
socketServer.initWsServer()

//------------------------
//Init DB
getDb()

//------------------------
//Server
app.listen(PORT, () => {
    console.log(`socketServer listening on port ${PORT}`);
    })

    app.on('error', (err:Error) => {
    console.log('ERROR =>', err);
    })
