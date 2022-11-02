import { app } from "./server/server"
import { SocketSevice } from "./service/socket.service"
import getDb from "./db/getDB"

const PORT = 8080
//------------------------
//Init socket Server
const socketService = new SocketSevice(app)

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
