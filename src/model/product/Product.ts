import { v4 as uuidv4 } from 'uuid'

export default class Producto {
    private id:string
    constructor(private title: string, 
                    private price:number, private url:string) {
            this.id = uuidv4()
    }

    get getTitle(): string {
        return this.title
    }

    get getPrice(): number {
        return this.price
    }

    get getUrl(): string {
        return this.url
    }

    get getId(): string {
        return this.id
    }
}