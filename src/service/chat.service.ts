import { chatDatabase } from "../repository/RelationalDB"
import moment from "moment"
import { ChatMessage } from "../model/msg/ChatMessage"
import { chatMessageDAO } from "../model/msg/ChatMessageDAO"

class ChatService {
    createError = require('http-errors')
    chatRepository:any

    constructor(){
        this.chatRepository = chatMessageDAO
    }

    async saveMsg(data:any) : Promise<ChatMessage | Error> {
        let {msg} = data
        let {id,nombre,apellido,edad,alias,avatar} = data.author

        let author = new ChatMessage.Author(id,nombre,apellido,edad,alias,avatar)
        let chatMsg = new ChatMessage(msg,author)

        console.log(chatMsg)
        return await this.chatRepository.create(chatMsg)
    }

    async chatMsgs(id?:string) : Promise<ChatMessage[] | Error> {
        return await this.chatRepository.get(id)
    }

    async deleteAllMsgs() : Promise<void> {
        await this.chatRepository.delete()
    }
}

export const chatService = new ChatService()