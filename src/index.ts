import express from 'express'
import {Contenedor, Producto} from '../src/04 - FileSystem/DesafioEntregable2'

const app = express()
app.use(express.json())

const PORT = 3000

app.get('/ping', (_,res) => {
    console.log('pinging all over the world');
    res.send('pong')
})

app.listen(PORT, () => {
    console.log(`server is listening on ${PORT}`);
})

const path = require('path')
const route = path.resolve(__dirname, './04 - FileSystem/Database')

const contenedor = new Contenedor(route)

const main = async (contenedor:Contenedor) => {
    try {
        console.log('Saving Products')
        await contenedor.save(new Producto(undefined,'mayonesa',200,'ww.com'))
        await contenedor.save(new Producto(undefined,'mostaza',400,'ww.com'))
        await contenedor.save(new Producto(undefined,'kechu',500,'ww.com'))

        console.log(await contenedor.getAll())
        console.log(await contenedor.getById(1))
        console.log(await contenedor.getById(22))

        console.log(await contenedor.deleteById(1))
        console.log(await contenedor.getAll())

        console.log(await contenedor.deleteAll())
        console.log(await contenedor.getAll())
    } catch (error) {
        console.log('Something went wrong dude');
    }
}

main(contenedor)
