import { ChatMessage } from "../model/msg/ChatMessage"
import { chatMessageDAO } from "../model/msg/ChatMessageDAO"
import { normalizeData, denormalizeData } from "../utils/Normalizer"
import { chatMsgSchema } from "../model/msg/ChatNormalizer"
class ChatService {
    createError = require('http-errors')
    chatRepository:any

    constructor(){
        this.chatRepository = chatMessageDAO
    }

    async saveMsg(data:any) : Promise<ChatMessage | Error> {
        let {text} = data
        let {id,nombre,apellido,edad,alias,avatar} = data.author

        let author = new ChatMessage.Author(id,nombre,apellido,edad,alias,avatar)
        let chatMsg = new ChatMessage(text,author)

        console.log(chatMsg)
        return await this.chatRepository.create(chatMsg)
    }

    async chatMsgs(id?:string) : Promise<ChatMessage[] | Error> {
        return await this.chatRepository.get(id)
    }

    async deleteAllMsgs() : Promise<void> {
        await this.chatRepository.delete()
    }

    async normalize() : Promise<any> {
        return await normalizeData(chatMessageDAO,chatMsgSchema)
    }

    async denormalize() : Promise<any> {
        let data = await this.normalize()
        return await denormalizeData(data, chatMsgSchema)
    }
}

export const chatService = new ChatService()