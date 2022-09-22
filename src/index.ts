import express from 'express'
import { Libro, Usuario } from './02 - Pps Javascript/DesafioEntregable'

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

let usuario1 = new Usuario("Sebastian","Alasia")

console.log(usuario1.getFullName());
usuario1.addMascota("Rober")
console.log(usuario1.countMascotas());
usuario1.addBook("El Señor de Los Anillos","El Pibe Tolkien")
usuario1.addBook("El Silmarillion","El Pibe Tolkien")
console.log(usuario1.getBookNames());

//todo TestSuite




