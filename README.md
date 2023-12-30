Create a "config.json" file on the main directory:

```
{
    "domain":"localhost",
    "port":3000,
    "ssl_enabled":false,
    "ssl_options":{
        "key":"/etc/letsencrypt/live/domain/privkey.pem",
        "cert":"/etc/letsencrypt/live/domain/fullchain.pem"
    },
    "sms_ir":{
        "api_key":"SMS_TOKEN",
        "line_number":11111111111
    }
}
```
