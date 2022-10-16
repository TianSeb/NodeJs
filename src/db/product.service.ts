import Producto from "../model/Product"

class Contenedor {
    fileName: string
    fs = require("fs")

    constructor(fileName:string) {
        this.fileName = `${fileName}.json`
        if(!this.fs.existsSync(this.fileName)){
            this.fs.writeFileSync(this.fileName,'[]')
        }
    }

    async save(obj:Producto) {
            try {
                let container = await this.getDatabase()
                if(container.length > 0){
                    let id = container[container.length - 1].id + 1
                    obj.id = id
                }
                else {
                    obj.id = 1
                }

                container.push(obj)
                await this.saveProducts(container)
                console.log(`Product with id: ${container[container.length-1].id} has been saved`);
            } catch (error) {
                throw new Error('Error')
            }
    }

    async getById(id:number){
        try {
            let container = await this.getDatabase()
            let objectFound = await this.objectExists(id)
            return (objectFound < 0) ? 'Id not found' : container[objectFound]
        } catch (error) {
            throw new Error('Error')
        }
    }

    async getAll(){
        try {
            let container = await this.getDatabase()
            return container
        } catch (error) {
            throw new Error('Error')
        }
    }

    async deleteById(id:number){
        try {
            let objectIndex = await this.objectExists(id)
            if(objectIndex < 0) { 
                return 'Id not found'
            }

            let container = await this.getDatabase()
            container.splice(objectIndex,1)
            await this.saveProducts(container)

            console.log(`Object with id: ${id}, has been deleted`)
        } catch (error) {
            throw new Error('Error')
        }
    }

    async deleteAll(){
        try {
            await this.saveProducts([])
            console.log('All objects had been removed');
        } catch (error) {
            throw new Error('Error')
        }
    }

    private async objectExists(id:number){
        let container = await this.getDatabase()
        let objIndex = container.findIndex((obj:any) => obj.id === id)

        return objIndex 
    }

    private async getDatabase() {
        try {
           let database = await this.fs.promises.readFile(this.fileName,'utf-8')
           let container = []
            if(database === "") {
                database = await this.fs.promises.writeFile(this.fileName,'[]')
            } else {
                container = JSON.parse(database) 
            }
            return container
        } catch (error) {
            console.log(error);      
        }
    }

    private async saveProducts(data: Array<Producto>) {
        await this.fs.promises.writeFile(this.fileName, JSON.stringify(data,null,'\t'))
    }
}

export default Contenedor