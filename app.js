const fs = require("fs")
const express = require('express');
const bodyParser = require('body-parser');
const {Smsir} = require('smsir-js')

fs.readFile("config.json",(err,config_json)=>{
  //Convert config data to array
  const config = JSON.parse(config_json)

  const app = express();
  const domain =config.domain;
  const port = config.port;

  //SMS.ir
  const smsir = new Smsir(config.sms_ir.api_key,config.sms_ir.line_number);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('public')); // Create a 'public' folder for your static files (CSS, JS, etc.)

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/layout/index.html');
  });

  app.post('/send-sms', (req, res) => {
      const phoneNumber = req.body.phoneNumber;
      const textMessage = req.body.textMessage;

      if(phoneNumber && textMessage){
          smsir.SendBulk(textMessage, [phoneNumber], null, config.sms_ir.line_number)
          res.sendFile(__dirname + '/layout/send.html');
      }
  });

  app.listen(port, () => {
    console.log(`Server is running at http://${domain}:${port}`);
  });

})