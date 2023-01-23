import got from 'got'



const parse_response = (response) => {
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

const get_nginx_data = async (url='http://127.0.0.1/nginx_status') => {
    try{
    const {body} = await got(url, {});
        console.log(parse_response(body))
        return parse_response(body)
    }catch(err){
        console.log(err)
        return err.code  
    }
}


export default get_nginx_data