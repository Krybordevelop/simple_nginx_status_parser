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
    //console.log('client connected')
    ws.on('message', (message) => {
        let test
        message = JSON.parse(message.toString())
        console.log(message)
        if(message.message === "start"){
            let interval = message.interval
             test = setInterval(async (interval) => {
                let data = await get_nginx_data()
                let parsed_data = JSON.stringify(data)
                ws.send(parsed_data)
            }, interval*1000 )

        }else if(message.message === "stop"){
            clearInterval(test)
        }else{

        }
    })


    //let data = JSON.stringify({message:'hello'})
    //ws.send(data);
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});

