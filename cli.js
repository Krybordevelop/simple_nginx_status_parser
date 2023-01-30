import { Nginx_data_getter} from './src/get_nginx_data.js'

let url = process.argv[2]  
let timer = process.argv[3] || 60

if(!url){
    console.log('please type url ')   
}else{
    console.log(`starting collect data. Time = ${timer}`)
    const nginx_data = new Nginx_data_getter(url)
    console.log(nginx_data.collect_data(timer))
}
