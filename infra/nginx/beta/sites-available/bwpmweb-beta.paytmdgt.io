server {
       server_name bwpmweb-beta.paytmdgt.io;
       location / {
                proxy_pass http://127.0.0.1:8953;
                proxy_connect_timeout 300;
                proxy_send_timeout 300;
                proxy_read_timeout 300;
                send_timeout 300;
                proxy_set_header HOST $server_name;
                access_log /var/log/nginx/bwpmweb.access.log;
                error_log /var/log/nginx/bwpmweb.access.log;
       }
}
