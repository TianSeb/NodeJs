import { ProductInstance as productService } from '../../src/service/product.service';
import Producto from '../../src/model/Product';

let container = []
let testId = ""

beforeEach(async () => {
    await productService.deleteAll()
    await productService.save(new Producto('mayonesa',200,'ww.com'))
    await productService.save(new Producto('mostaza',400,'ww.com'))
    await productService.save(new Producto('kechu',500,'ww.com'))
    container = await productService.getAll()
    testId = container[0]._id
})

describe('Product Service Test', () => {
    
        test('save object returns array.length = 4', async () => {
            const expected = 4
            await productService.save(new Producto('lemon',320,'ww.com'))
            const result = await productService.getAll()
            expect(result.length).toBe(expected)            
        })
    
        test('getById(testId) returns mayonesa', async () => { 
            const expected = 'mayonesa'
            const result = await productService.getById(testId)
            expect(result._title).toBe(expected)
         })

         test('getById(5) resolves in error', async () => { 
            await expect(productService.getById("5")).rejects.toThrow(Error)
         }) 

        test('deleteAll() deletes Db and getAll().lenght = 0', async () => { 
            await productService.deleteAll()
            const expected = 0
            const result = await productService.getAll()

            expect(result.length).toBe(expected)
         })

        test('deleteById(testId) deletes Product and getAll().length = 2 ', async () => { 
            await productService.deleteById(testId)
            const expected = 2
            const result = await productService.getAll()
            
            expect(result.length).toBe(expected)
         })
         
         test('getAll().length returns 3', async () => { 
            const expected = 3
            const result = await productService.getAll()
            expect(result.length).toBe(expected)
          })
})
