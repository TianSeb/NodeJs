class ChatService {
    createError = require('http-errors')

    constructor(private chat:any = [], private id:number = 0){}

    saveMsg(data:any) {
        const chatMsg = { ...data, id: ++this.id}
        this.chat.push(chatMsg)
       
        return chatMsg
    }

    getAllMsgs() {
        return this.chat
    }

    getMsgById(id:any) {
        const msg = this.chat.find((msg: { id: any }) => msg.id == id)
        return msg || this.createError(404, 'msg not found')
    }

    updateMsg(id:any, data:any) {
        const msg = this.chat.findIndex((msg: { id: any }) => msg.id == id)
        const msgId = msg.id
        const newMsg = {...data,msgId}
        
        return newMsg || this.createError(404, 'msg not found')
    }

    deleteMsgById(id:any) {
        const msg = this.chat.findIndex((msg: { id: any }) => msg.id == id)
        return (msg !== -1) ? this.chat.splice(msg,1) : this.createError(404, 'msg not found')
    }

    deleteAllMsgs() {
        this.chat = []
    }
}

export { ChatService }