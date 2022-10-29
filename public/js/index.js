const socket = io().connect('http://localhost:8080', { forceNew: true })

const inputUserName = document.getElementById('inputUserName')
const inputMensaje = document.getElementById('inputMsg')
const btnEnviar = document.getElementById('btnEnviar')
const formPublicarMsg = document.getElementById('formPublicarMsg')

socket.on('msgGuardado', msg => {
    console.log(msg)
})

formPublicarMsg.addEventListener('submit', e => {
    e.preventDefault()

    const data = {userEmail: inputUserName.value , msg: inputMensaje.value}
    socket.emit('msgEnviado', data)
    formPublicarMsg.reset()
    inputMensaje.focus()
})

inputUserName.addEventListener('input', () => {
    const emailTrue = inputUserName.value.length
    const msgTrue = inputMensaje.value.length
    inputMensaje.disabled = !emailTrue
    btnEnviar.disabled = !emailTrue || !msgTrue
})

inputMensaje.addEventListener('input', () => {
    const msgTrue = inputMensaje.value.length
    btnEnviar.disabled = !msgTrue
})


















// socket.emit('askData')

// socket.on('productos', productos => {
//     makeHtmlTable(productos).then(html => {
//         document.getElementById('productos').innerHTML = html
//     })
// });

// function makeHtmlTable(productos) {
//     return fetch('views/productHistory.ejs')
//         .then(respuesta => respuesta.text())
//         .then(plantilla => {
//             const template = ejs.compile(plantilla);
//             const html = template({ productos })
//             return html
//         })
// }