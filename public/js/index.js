const socket = io().connect('http://localhost:8080', { forceNew: true })

const inputUserName = document.getElementById('inputUserName')
const inputMensaje = document.getElementById('inputMsg')
const btnEnviar = document.getElementById('btnEnviar')
const formPublicarMsg = document.getElementById('formPublicarMsg')
const msgBox = document.getElementById('msgBox')
const formPostProducto = document.getElementById('productForm')


socket.on('productos', productos => {
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })
})

function makeHtmlTable(productos) {
    return fetch('views/productHistory.ejs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = ejs.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

socket.on('mensajes', data => {
    outputMsgs(data)
    msgBox.scrollTop = msgBox.scrollHeight
})

formPublicarMsg.addEventListener('submit', e => {
    e.preventDefault()
    console.log('msg enviado')
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


function outputMsgs(mensajes) {
    msgBox.innerHTML = ''
    mensajes.map(msg => {
        const div = document.createElement('div')
        div.classList.add('message')
        div.innerHTML = `
        <p class="meta">${msg.userEmail}</p>
        <p class="text"> <span> ${msg.date} : </span> ${msg.msg} </p>`
        msgBox.appendChild(div)
    })
}