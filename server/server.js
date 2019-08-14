// Require express - gives us a function
const express = require('express');
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')

// Create an instance of express by calling the function returned above - gives us an object
const app = express();
const PORT = process.env.PORT || 3001

// express static file serving - public is the folder name
app.use(express.static('server/public'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false}))

app.post('/api/form', (req, res) => {
    nodemailer.createTestAccount((err, account) => {
    const htmlEmail = `
    <h3>Contact Details</h3>
    <ul>
        <li>Name: ${req.body.name}</li>
        <li>Email: ${req.body.email}</li>
    </ul>
    <h3> Message, </h3>
    <p>${req.body.notes}</p>
    `

    let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: 'kadin.dare@ethereal.email',
          pass: '8vUhA2V43kTUDWswMk'
        }
      });

    let mailOptions = {
        from: 'test@testaccount.com',
        to: 'kadin.dare@ethereal.email',
        replyTo: 'test@testaccount.com',
        subject: 'new messasge',
        text: req.body.notes,
        html: htmlEmail
    }
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err)
        }
        console.log('message sent!: %s', info.massage)
        console.log('Message URL: %s', nodemailer.getTestMessageUrl(info  ))
    })
})    
})

// Start up our server
app.listen(PORT, function(){
  console.log(`listening on port ${PORT}`);
});