import mongoose from "mongoose"
import { MongoRepository } from "../../repository/MongoRepository"

const chatMessageCollection = 'chat'

const chatSchema = new mongoose.Schema({
        text: {type: String, required: true},
        author: {
            id: {type: String, required: true},
            nombre: {type: String, required: true},
            apellido: {type: String, required: true},
            edad: {type: String, required: true},
            alias: {type: String, required: true},
            avatar: {type: String, required: true},
        }},
        {timestamps:true , versionKey: false}
)

class ChatMessageDAO extends MongoRepository {
    constructor(){
        super(chatMessageCollection,chatSchema)
    }
}

export const chatMessageDAO = new ChatMessageDAO()