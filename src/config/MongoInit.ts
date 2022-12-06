import mongoose from "mongoose"
import * as dotenv from 'dotenv'
dotenv.config()

export const mongoDbInit = async () => {
    try { 
		let srv:any = process.env.mongoAtlas 
        await mongoose.connect(srv)
        console.log("DB connected")
    } catch (error) {
        console.log(error)
        return error
    }
}

export default mongoDbInit