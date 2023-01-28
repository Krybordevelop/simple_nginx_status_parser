import express from 'express'
import fs from 'fs/promises'
import http from 'http'
import { Nginx_data_getter} from './src/get_nginx_data.js'
import { WebSocketServer } from 'ws'


const app = express()
const server = http.createServer(app);
const wss = new WebSocketServer({server})

app.use(express.static('public'))


wss.on('connection', (ws) => {
    //console.log('client connected')
    ws.on('message', (message) => {
        message = JSON.parse(message.toString())
        if(message.message === "start"){
            let interval = message.interval
            let test = setInterval(async (interval) => {
                let data = await get_nginx_data()
                let parsed_data = JSON.stringify(data)
                ws.send(parsed_data)
            }, interval*1000 )

        }else if(message.message === "stop"){
            console.log(test)
        }else{

        }
    })


    //let data = JSON.stringify({message:'hello'})
    //ws.send(data);
});


let mynginx = new Nginx_data_getter("http://127.0.0.1/nginx_status")
console.log(mynginx.collect_data(20))
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
