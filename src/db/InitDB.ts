import knex from "knex"
import dbConfig from './knexfile'

const PRODUCTOS_TABLE = 'productos'
const CHAT_TABLE = 'chat'
const productos = [
	{
		"title": "mayonesa",
		"price": 200,
		"url": "https://cdn3.iconfinder.com/data/icons/food-and-beverages-7/64/03_chicken_fries_thigh_food-512.png",
		"id": "73ba180e-1358-4ea6-bcca-18d764451f23"
	},
	{
		"title": "mostaza",
		"price": 400,
		"url": "https://cdn3.iconfinder.com/data/icons/food-and-beverages-7/64/09_juice_drink_beverages_orange-512.png",
		"id": "4b59af2e-0d18-441e-9d71-77b37a4b219d"
	},
	{
		"title": "kechu",
		"price": 500,
		"url": "https://cdn3.iconfinder.com/data/icons/food-and-beverages-7/64/20_hot_dog_sussage_food-512.png",
		"id": "d4678496-babb-4be3-8fd0-2a4251c107aa"
	}
]

const db = knex(dbConfig.development)

const initProductosTable = async() => {
    await db.schema.createTable(PRODUCTOS_TABLE, (table) => {
        table.string('id')
        table.string('title').notNullable()
        table.integer('price',3).notNullable()
        table.string('url')
    })
    await db(PRODUCTOS_TABLE).insert(productos)
    console.log('Tabla productos creada')
}

const initChatTable = async () => {
    await db.schema.createTable(CHAT_TABLE, (table) => {
        table.string('userEmail')
        table.string('msg')
        table.string('date')
    })

    await db(CHAT_TABLE).insert({
        userEmail: "jorge@burrito.com",
        msg: "primeramente quisiera saludar...",
        date: "12/12/2022"
    })

    console.log('Tabla chat creada')
}

export const initDb = async () => {
    try {
        const productosTableExists = await db.schema.hasTable(PRODUCTOS_TABLE)
        const chatTableExists = await db.schema.hasTable(CHAT_TABLE)

        if(!productosTableExists){
            console.log('Creando tabla productos')
            await initProductosTable()
        }
        
        if(!chatTableExists){
            console.log('Creando tabla chat')
            await initChatTable()
        }    

    } catch (error) {
        console.log('Error Creating Databases')
        console.log(error)
    } finally {
        await db.destroy()
    }
}