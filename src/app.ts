import { app } from "./server/server"
import { SocketService } from "./service/socket.service"
import { initDb } from "./db/InitSQL"
import { ChatMessage } from "./model/msg/ChatMessage"

const PORT = 8080

let author = new ChatMessage.Author("sdf","df","df","sdf","sdf","sdf")
let msg = new ChatMessage("aaaaaaaa",author)

console.log(msg)
const init = async () => {
    const socketService = new SocketService(app)
    await initDb()
    app.listen(PORT, () => {
        console.log(`socketServer listening on port ${PORT}`);
        })

        app.on('error', (err:Error) => {
        console.log('ERROR =>', err);
        })    
}

init()
