import express from 'express'
import routes from '../08 - RouterMulter/routes/routes'

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true}))
app.use(routes)

//import {Contenedor, Producto} from './04 - FileSystem/DesafioEntregable2'

// app.get('/ping', (_,res) => {
//     console.log('pinging all over the world');
//     res.send('pong')
// })

// app.listen(PORT, () => {
//     console.log(`server is listening on ${PORT}`);
// })

// app.get('/productos', (_,res) => {
//     res.send(productos)
// })

// app.get('/productoRandom', (_,res) => {
//     res.send(randomProd(productos))
// })

// const path = require('path')
// const route = path.resolve(__dirname, './04 - FileSystem/Database')

// const contenedor = new Contenedor(route)
// let productos: string | any[] = []

// const randomProd = (productos:any) => {
//     const random = Math.floor(Math.random() * productos.length)
//     return productos[random]
// }

// const main = async (contenedor:Contenedor) => {
//     try {
//         console.log('Saving Products')
//         productos = await contenedor.getAll()
        
//         if(productos.length === 0) {
//             await contenedor.save(new Producto(undefined,'mayonesa',200,'www.elMorza.com'))
//             await contenedor.save(new Producto(undefined,'mostaza',400,'www.elMorza.com'))
//             await contenedor.save(new Producto(undefined,'kechu',500,'www.elMorza.com'))
//         }
//     } catch (error) {
//         console.log('Error Loading Container || Products');
//     }
// }

// main(contenedor)

export {app as server}