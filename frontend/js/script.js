const login = document.querySelector('.login')
const loginForm = login.querySelector('.login__form')
const loginInput = login.querySelector('.login__input')

const chat = document.querySelector('.chat')
const chatForm = chat.querySelector('.chat__form')
const chatInput = chat.querySelector('.chat__input')
const chatMessages = chat.querySelector(".chat__messages")

const cores = [
    "cadetblue",
    "darkgoldenrod",
    "cornflowerblue",
    "darkkhaki",
    "hotpink",
    "gold"
]

const user = { id: "", nome: "", cor: ""}

let websocket

const minhaMensagem = (content) => {
    const div = document.createElement("div")
    div.classList.add("message--self")
    div.innerHTML = content

    return div
}

const outraMensagem = (content, sender, senderColor) => {
    const div = document.createElement("div")
    const span = document.createElement("span")

    div.classList.add("message--other")
    div.classList.add("message--self")
    span.classList.add("message--sender")
    span.style.color = senderColor

    div.appendChild(span)

    span.innerHTML = sender
    div.innerHTML += content

    return div
}

const qualquerCor = () => {
    const randomIndex = Math.floor(Math.random() * cores.length)
    return cores[randomIndex]
}

const rolar = () => {
    window.scrollTo({
        top:document.body.scrollHeight,
        behavior: "smooth"
    })
}

const processMessage = ({ data }) => {
    const { userId, userName, userColor, content} = JSON.parse(data)

    const message = userId == user.id ? minhaMensagem(content) : outraMensagem(content, userName, userColor) 

    chatMessages.appendChild(message)
    rolar()
}

const handleLogin = (event) => {
    event.preventDefault()
    user.id = crypto.randomUUID()
    user.nome = loginInput.value
    user.cor = qualquerCor()

    login.style.display = "none"
    chat.style.display = "flex"

    websocket = new WebSocket("wss://sherekchat.onrender.com")
    websocket.onmessage = processMessage
}

const sendMessage = (event) => {
    event.preventDefault()

    const message = {
        userId: user.id,
        userName: user.nome,
        userColor: user.cor,
        content: chatInput.value
    }

    websocket.send(JSON.stringify(message))

    chatInput.value = ""
}

loginForm.addEventListener("submit", handleLogin)
chatForm.addEventListener("submit", sendMessage)
