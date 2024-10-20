## Este é um Chat que permite varios usuários, as mensagens ficam no cache temporario do usuario.

Para rodar o Projeto você precisará tero Node instalado.
(as dependências já vem contida no projeto).

Para rodar localmente:
```bash
cd backend/src
```
```bash
node server.js
```

Para rodar com o server em uma maquina separada:
```bash
cd frontend/js
```
no arquivo script.js 
```bash
websocket = new WebSocket("ws://localhost:8080") #troque a URL pela do servidor
