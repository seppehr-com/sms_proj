const fs = require("fs")
const express = require('express');
const bodyParser = require('body-parser');
const {Smsir} = require('smsir-js')

function isValidPhoneNumber(phoneNumber) {
  const phoneRegex = /^9\d{9}$/g;
  return phoneRegex.test(phoneNumber);
}

fs.readFile("config.json",(err,config_json)=>{
  //Convert config data to array
  const config = JSON.parse(config_json)

  const app = express();
  const domain =config.domain;
  const port = config.port;

  //SMS.ir
  const smsir = new Smsir(config.sms_ir.api_key,config.sms_ir.line_number);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(express.static('public')); 

  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/layout/index.html');
  });

  app.post('/send-sms', (req, res) => {
      const phoneNumber = req.body.phoneNumber;
      const textMessage = req.body.textMessage;

      //Get error file
      let errorHtmlContent = fs.readFileSync(__dirname + '/layout/error.html', 'utf8');

      // Validate phone number format
      if (!isValidPhoneNumber(phoneNumber)) {
        errorHtmlContent = errorHtmlContent.replace('{{error}}', 'Invalid phone number format');
        return res.send(errorHtmlContent);
      }
      // Validate text message length
      if (textMessage.length > 70) {
        errorHtmlContent = errorHtmlContent.replace('{{error}}', 'Text message is too long');
        return res.send(errorHtmlContent);
      }

      if(phoneNumber && textMessage){
          smsir.SendBulk(textMessage, [phoneNumber], null, config.sms_ir.line_number)
          .then(result => {
              //Message result.data.message
              res.sendFile(__dirname + '/layout/successful.html');
           })
          .catch(error => {
            errorHtmlContent = errorHtmlContent.replace('{{error}}', error);
            return res.send(errorHtmlContent);
          });
      }
  });

  app.listen(port, () => {
    console.log(`Server is running at http://${domain}:${port}`);
  });

})