const socket = io()

socket.on('productos', productos => {
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
});

function makeHtmlTable(productos) {
    return fetch('views/productHistory.ejs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = ejs.compile(plantilla);
            const html = template({ productos })
            return html
        })
}