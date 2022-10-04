import { Contenedor, Producto } from '../../src/04 - FileSystem/DesafioEntregable2';

const path = require('path')
const route = path.resolve(__dirname, './Database')
const contenedor = new Contenedor(route)

beforeEach(async () => {
    await contenedor.save(new Producto(undefined,'mayonesa',200,'ww.com'))
    await contenedor.save(new Producto(undefined,'mostaza',400,'ww.com'))
    await contenedor.save(new Producto(undefined,'kechu',500,'ww.com'))
})
afterEach(async () => {await contenedor.deleteAll()})

describe('Tests Ejercicio Clase 4', () => {
    
        test('save object returns array.length = 4', async () => {
            const expected = 4
            await contenedor.save(new Producto(undefined,'lemon',320,'ww.com'))
            const result = await contenedor.getAll()
            expect(result.length).toBe(expected)
        })
    
        test('getById(1) returns mayonesa', async () => { 
            const expected = 'mayonesa'
            const result = await contenedor.getById(1)
            expect(result._title).toBe(expected)
         })

         test('getById(5) resolves in error', async () => { 
            await expect(contenedor.getById(5)).resolves.toThrow(Error)
         }) 

         test('getAll().length returns 3', async () => { 
            const expected = 3
            const result = await contenedor.getAll()
            expect(result.length).toBe(expected)
          })

        test('deleteById(1) deletes Product and getAll().length = 2 ', async () => { 
            await contenedor.deleteById(1)
            const expected = 2
            const result = await contenedor.getAll()
            
            expect(result.length).toBe(expected)
         })

        test('deleteAll() deletes Db and getAll().lenght = 0', async () => { 
            await contenedor.deleteAll()
            const expected = 0
            const result = await contenedor.getAll()

            expect(result.length).toBe(expected)
         })
})
