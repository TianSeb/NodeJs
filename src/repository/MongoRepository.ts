import mongoose from "mongoose"

export class MongoRepository {
    private collection:any
    
    constructor(collection:string, schema:any) {
        this.collection = mongoose.model(collection, schema)
        console.log(`INITIALIZING MONGO DB`)
    }

    async get(id?:string){
        return (id) ? this.collection.findById(id)
                            : this.collection.find()
    }

    async create(data:any) {
        return this.collection.create(data)
    }

    async update(id:string, data:any) {
        return this.collection.findByIdAndUpdate(id,data,{ new: true })
    }

    async delete(id?:string){
        return (id) ? this.collection.findByIdAndDelete(id)
                            : this.collection.deleteMany({})
    }
}