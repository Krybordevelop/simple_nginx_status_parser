# simple_nginx_status_parser
nodejs, ws, parser, nginx, practice

Requirements:
1.
http://nginx.org/en/docs/http/ngx_http_stub_status_module.html
2.
NodeJs & NPM

RUN npm install
node cli.js pass_to_nginx_stab_status_page interval_in second 

exemple
node cli.js http://127.0.0.1:8080/stub_status 120 
result will show total requst per 120 second and avg/1 sec
