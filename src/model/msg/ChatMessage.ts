export class ChatMessage {
    constructor(public text:String,public author:ChatMessage.Author){}
}

export namespace ChatMessage {
    export class Author {
        constructor(public id:String,public nombre:String,public apellido:String,
            public edad:String,public alias:String,public avatar:String){}
    }
}