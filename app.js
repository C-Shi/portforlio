require('dotenv').config()

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const PORT = process.env.PORT || 3000;
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);


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
  const email = req.body.email;
  const contact = req.body.contact;
  const message = req.body.message;

  const msg = {
    to: process.env.ADMIN_EMAIL,
    from: email,
    subject: `Email from ${contact} at ${email}`,
    text: message,
    html: `<p>${message}</p>`
  }

  sgMail.send(msg)
  .then(() => {
    return res.send('Your Message Has Been Sent To CHENG SHI!');
  })
  .catch(error => {
    return res.send(error.message);
  })

})


app.listen(PORT, function(){
    console.log('server start');
})