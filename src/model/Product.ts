class Producto {
    constructor(public id:number = 0, private _title: string, 
        private _price:number, private _url:string) {}

        public get title(): string {
            return this._title
        }
}

export default Producto