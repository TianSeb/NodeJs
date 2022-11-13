import { v4 as uuidv4 } from 'uuid'
class Producto {
    private id:string
    constructor(private title: string, 
                    private price:number, private url:string) {
            this.id = uuidv4()
    }

    public get getTitle(): string {
        return this.title
    }

    public get getPrice(): number {
        return this.price
    }

    public get getUrl(): string {
        return this.url
    }

    public get getId(): string {
        return this.id
    }
}

export default Producto