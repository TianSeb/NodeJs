import { Usuario } from '../../src/02 - Pps Javascript/DesafioEntregable'

describe('Tests Ejercicio Clase 2', () => {
    const usuario1 = new Usuario("Sebastian","Alasia")

    describe('getFullName', () => { 
        const expected = 'Sebastian Alasia'
        const result = usuario1.getFullName()

        test('getFullName devuelve Sebastian Alasia', () => {
            expect(result).toEqual(expected)
        })
        test('getFullName is not Null', () => { 
            expect(result).not.toBeNull()
         })
     })

    describe('countMascotas', () => { 
        
        beforeEach(() => {
            usuario1.addMascota("Rober")
        }) 

        test('countMascotas returns 1', () => { 
            expect(usuario1.countMascotas()).toEqual(1)
         })
     })

    describe('getBookNames', () => { 
        const nombreLibro1 = "El Señor de Los Anillos"
        const nombreLibro2 = "El Silmarillion"
        const bookAuthor = "El Pibe Tolkien"
        beforeEach(() => {
            usuario1.addBook(nombreLibro1, bookAuthor)
            usuario1.addBook(nombreLibro2, bookAuthor)
        }) 

        test('getBookNames.length equals 2', () => { 
            expect(usuario1.getBookNames().length).toEqual(2)
        })
        
        test('getBookNames return only the names of the books added', () => { 
            let books = usuario1.getBookNames()

            expect(books[0]).toEqual(nombreLibro1)
            expect(books[1]).toEqual(nombreLibro2)
        })
     }) 
})
