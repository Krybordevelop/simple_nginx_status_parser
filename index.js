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
    ws.on('message', (message) => {
        message = JSON.parse(message.toString())
        const test = new Nginx_data_getter(message.url)
        
        if(message.message === "start"){
            let intervals= setInterval(() => {
                test.collect_data(message.interval, (final)=>{
                    ws.send(JSON.stringify(final))
                })
            }, message.interval*1000 )

        }else if(message.message === "stop"){
            console.log(test)
        }else{

        }       
    })
});


//let mynginx = new Nginx_data_getter("http://127.0.0.1/nginx_status")
//console.log(mynginx.collect_data(20))
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
