const express = require('express')
const app = express()
const nodeMailer = require('nodemailer')
app.use(express.urlencoded({ extended: true }))
const adminEmail = "vrajeshwadhavana@gmail.com"
const adminPassword = "urqqhdgxotfvdyoy"
const mailHost = 'smtp.gmail.com'
const mailPort = 587


app.use(express.json());
app.set(express.urlencoded({extended:true}));

const initRoutes = (app) => {
  app.post('/post',(req, res) => {
    if(req.query.key == "ADMIN8512635478"){
       const transporter = nodeMailer.createTransport({
          host: mailHost,
          port: mailPort,
          secure: false,
          auth: {
            user: adminEmail,
            pass: adminPassword
          }
        }) 
        const options = {
          from: adminEmail,
          to: req.body.email,
          subject: 'MCIPL',
          html: req.body.html
        }
        return transporter.sendMail(options)
          .then(info => res.end())
          .catch(error => res.json({"Error":"email error"}))
      }
    else{
      res.json({"Error":"Unauthorized"});
    }
  })
}

initRoutes(app)

const port = 8017
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})
