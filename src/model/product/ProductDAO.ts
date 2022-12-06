import mongoose from "mongoose"
import { MongoRepository } from "../../repository/MongoRepository";


const productoCollectionName = 'producto';

const productSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    descripcion:{ type: String},
    foto: { type: String},
    codigo: { type: String, required: true, unique: true },
    stock: { type: Number, default:10 },
    precio: { type: Number, default: 0 },
},{ timestamps: true, versionKey: false })

class ProductsMongoDao extends MongoRepository {
    constructor() {
        super(productoCollectionName,productSchema)
    }
}

export const productosMongoDAO = new ProductsMongoDao()