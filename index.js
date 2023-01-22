import express from 'express'
import fs from 'fs/promises'
import http from 'http'
import get_nginx_data from './src/get_nginx_data.js'
import { WebSocketServer } from 'ws'


const app = express()
const server = http.createServer(app);
const wss = new WebSocketServer({server})
console.log(get_nginx_data())

app.use(express.static('public'))


wss.on('connection', (ws) => {
    console.log('client connected')
    ws.on('message', (message) => {g
        console.log('received: %s', message);
        ws.send(`Hello, you sent -> ${message}`);
    });
    const test = setInterval(async ()=>{
        let data = await get_nginx_data()
        let parsed_data = JSON.stringify(data)
        ws.send(parsed_data)} ,2000)
    let data = JSON.stringify({message:'hello'})
    ws.send(data);
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

