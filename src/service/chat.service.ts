import { chatDatabase } from "../db/DbRepository"

class ChatService {
    createError = require('http-errors')
    moment = require('moment')
    chatRepository:any

    constructor(){
        this.chatRepository = chatDatabase
    }

    async saveMsg(data:any) : Promise<Message | Error> {
        let {userEmail, msg} = data
        const chatMsg : Message = {
                            userEmail, 
                            msg,
                            date: this.moment().format('DD/MM/YYYY HH:MM:SS')
                        }

        return await this.chatRepository.create(chatMsg)
    }

    async getAllMsgs() : Promise<Message[] | Error> {
        return await this.chatRepository.get()
    }

    async deleteAllMsgs() : Promise<void> {
        await this.chatRepository.delete()
    }
}

type Message = {
    userEmail: string,
    msg: string,
    date: string
}

export default ChatService