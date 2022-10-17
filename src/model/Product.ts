import { v4 as uuidv4 } from 'uuid'
class Producto {
    private _id:string
    constructor(private _title: string, 
        private _price:number, private _url:string) {
            this._id = uuidv4()
        }

        public get title(): string {
            return this._title
        }

        public get price(): number {
            return this._price
        }

        public get url(): string {
            return this._url
        }
}

export default Producto