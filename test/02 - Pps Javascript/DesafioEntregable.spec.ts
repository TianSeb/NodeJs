import { Libro, Usuario } from '../../src/02 - Pps Javascript/DesafioEntregable'

let usuario1 = new Usuario("Sebastian","Alasia")
usuario1.addMascota("Rober")
usuario1.addBook("El Señor de Los Anillos","El Pibe Tolkien")
usuario1.addBook("El Silmarillion","El Pibe Tolkien")

describe('Tests Ejercicio Clase 2', () => {
    test('getFullName devuelve Sebastian Alasia', () => {
        const expected = 'Sebastian Alasia'
        const result = usuario1.getFullName()

        expect(result).toEqual(expected)
    })
})

// console.log(usuario1.getFullName());
// console.log(usuario1.countMascotas());
// console.log(usuario1.getBookNames());