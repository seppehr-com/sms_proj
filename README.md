<h2>Installation</h2>
<b>1. </b>First thing to do is: <br>

```
git clone https://github.com/seppehr-com/sms_proj.git
```

<br>
<b>2. </b>Then you should install the repositories with this command: <br>

```
npm install
```

<br>
<b>3. </b>Then create a "config.json" file on the main directory.
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

<br>
<b>4. </b>Finally run this command and enjoy! :D <br>

```
node app.js
```
