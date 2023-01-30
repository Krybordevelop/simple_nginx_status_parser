import got from 'got'

export class Nginx_data_getter{
    constructor(nginx_status_url, mode, options){
        this.nginx_status_url = nginx_status_url
        this.mode =  mode | 'simple'
        if(options){
            this.count_my_requests = options.count_my_requests | false
            this.interval = options.interval | 60
        }  
    }

    static async chek_connection(nginx_status_url) {
        try{
            const {body} = await got(nginx_status_url, {});
                if(body.indexOf("server accepts handled requests") == -1){
                    console.log(`conection succesfull, but site ${nginx_status_url} does not lock like nginx sub stats`)
                    return 'conection succesfull, but site does not lock like nginx sub stats'
                }
                //console.log(body)
                return body
            }catch(err){
                console.log(`cannot connect to ${nginx_status_url}`)
                return err.code  
            }
    } 

    async get_data(){
        
    }

    parse_nginx_response(response){
        let parse_data = response.split(' ')
        const final_josn = {}
        final_josn['Active connections'] = parse_data[2]
        final_josn['Accepts Total'] = parse_data[7]
        final_josn['Handled Total'] = parse_data[8]
        final_josn['Requests Total'] = parse_data[9]
        final_josn['Reading'] = parse_data[11]
        final_josn['Writing'] = parse_data[13]
        final_josn['Waiting'] = parse_data[15]
        final_josn['Raw Data'] = response
        return(final_josn)
     }

     async get_nginx_data(){
        try{
            const {body} = await got(this.nginx_status_url, {});
                return this.parse_nginx_response(body)
            }catch(err){
                console.log(err)
                return err.code  
            }
     }

      
      async collect_data(timer,callback){
        // get initial values
        let start = Date.now()
        let get_start_value = await this.get_nginx_data()

        setTimeout(async()=>{
            let get_end_value = await this.get_nginx_data()
            let final = {}
            final.accepts = get_end_value['Accepts Total'] - get_start_value['Accepts Total']
            final.handelet = get_end_value['Handled Total'] - get_start_value['Handled Total']
            final.total = get_end_value['Requests Total'] - get_start_value['Requests Total']
            final.per = timer
            final.avg = final.total/timer
            callback(final)
        },timer*1000)
      }
}
