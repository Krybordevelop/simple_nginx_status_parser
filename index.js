import express from 'express'
import http from 'http'
import { Nginx_data_getter} from './src/get_nginx_data.js'
import { WebSocketServer } from 'ws'


const app = express()
const server = http.createServer(app);
const wss = new WebSocketServer({server})

app.use(express.static('public'))


//app.get('/api', (req,res)=>{
//    res.send()
//})

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        message = JSON.parse(message.toString())
        const test = new Nginx_data_getter(message.url)
        console.log(message)
        let intervals;
        if(message.message === "start"){
            clearInterval(intervals)
            intervals= setInterval(() => {
                test.collect_data(message.interval, (final)=>{
                    ws.send(JSON.stringify(final))
                })
            }, message.interval*1000 )
        }else if(message.message === "stop"){
            console.log(intervals)
            clearInterval(intervals)
        }else{

        }       
    })
});

server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${server.address().port} :)`);
});
