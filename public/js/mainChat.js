const socket = io().connect('http://localhost:8080', { forceNew: true })

const chatMsgBox = document.getElementById('chatMsgBox')
const formMensajes = document.getElementById('formMensajes')
const inputMensaje = document.getElementById('mensaje')

formMensajes.addEventListener('submit', e => {
    e.preventDefault()
    if (email.value && mensaje.value) {
        let data = {
          text: mensaje.value,
          author: {
            id: email.value,
            nombre: nombre.value,
            apellido: apellido.value,
            alias: alias.value,
            edad: edad.value,
            avatar: avatar.value,
          }
        };
        socket.emit('chatMsgSent', data)
        inputMensaje.value = ""
        inputMensaje.focus()
    }
})

socket.on('msgChat', data => {
    outputMsgs(data)
    chatMsgBox.scrollTop = chatMsgBox.scrollHeight
})

function outputMsgs(mensajes) {
    chatMsgBox.innerHTML = ''
    mensajes.map(msg => {
        const div = document.createElement('div')
        div.classList.add('message')
        div.innerHTML = `
        <p class="meta">${msg.author.id}</p>
        <p class="text"> <span> ${msg.author.alias} : </span> ${msg.text} </p>`
        chatMsgBox.appendChild(div)
    })
}