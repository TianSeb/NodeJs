type Message = {
    userEmail: string,
    msg: string,
    id: number,
    date: string
}
class ChatService {
    createError = require('http-errors')
    moment = require('moment')

    constructor(private chat:Message[] = [], private id:number = 0){}

    saveMsg(data:any) : Message {
        let {userEmail, msg} = data
        const chatMsg : Message = {
                            userEmail, 
                            msg, 
                            id: ++this.id, 
                            date: this.moment().format('DD/MM/YYYY HH:MM:SS')
                        }
        this.chat.push(chatMsg)
       
        return chatMsg
    }

    getAllMsgs() : Message[] {
        return this.chat
    }

    deleteAllMsgs() : void {
        this.chat = []
    }
}

export { ChatService }