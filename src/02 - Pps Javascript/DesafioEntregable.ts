class Libro {
    constructor(private _nombre:string, private _autor:string) {
    }

    getName() {
        return this._nombre
    }
}

class Usuario {

    private _Libros:Libro[] 
    private _Mascotas:string[]

    constructor(private _nombre:string, private _apellido:string) {
        this._Libros = []
        this._Mascotas = []
    }

    getFullName() {
        return `${this._nombre} ${this._apellido}`
    }

    addMascota(nombreMascota:string){
        this._Mascotas.push(nombreMascota)
    }

    countMascotas(){
        return this._Mascotas.length
    }

    addBook(titulo:string, autor:string){
        let newBook = new Libro(titulo,autor)
        this._Libros.push(newBook)
    }

    getBookNames(){
        let bookNames = this._Libros.map( book => book.getName())
        return bookNames
    }
}

export { Libro, Usuario}