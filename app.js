require('dotenv').config()

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var async = require('async');
var nodemailer = require('nodemailer');
var crypto = require('crypto');

var PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render("index");
})

app.get('/portfolio', (req, res) => {
    res.render("portfolio");
})

app.get('/contact', (req, res) => {
    res.render("contact");
})


app.post('/contact', (req, res) => {
  console.log(req.body)
  let smtpTransport = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "kyleshi82@gmail.com",
          pass: process.env.GMAILPW
        }
      });
  let mailOptions = {
        from: "kyleshi82@gmail.com", // sender address
        to: req.body.email, // list of receivers
        subject: 'Message from ' + req.body.name + " about BUSINESS", // Subject line
        text: req.body.message + "\n\n" + "Please reply to " + req.body.email , // plain text body
    };

    // send mail with defined transport object
  smtpTransport.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);
      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      res.redirect('/')
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  });
})

app.listen(PORT, function(){
    console.log('server start');
})