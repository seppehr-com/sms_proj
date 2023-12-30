<h2>Installation</h2>
First thing to do is:
```git clone https://github.com/seppehr-com/sms_proj.git```

Then you should install the repositories with this command: <br>

```
npm install
```

Then create a "config.json" file on the main directory.
Your config should be like this:

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

Finally run this command and enjoy! :D <br>

```
node app.js
```
