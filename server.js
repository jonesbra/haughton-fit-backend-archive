var http = require('http')
var express = require('express')
var app = express()
var cors=require('cors')
var bodyParser = require('body-parser')
var nodemailer = require('nodemailer')
var fs = require('fs')

var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    callback(null, true)
  }
}

function sendComment (commentForm) {
  var nameLine = 'Name: ' + commentForm.name + '\n'
  var emailLine = 'Email: ' + commentForm.email + '\n\n'
  commentForm.comment = nameLine + emailLine + commentForm.comment

  var subject = 'New Comment'

  return new Promise(function(resolve, reject) {
    sendEmail(subject, commentForm.comment)
      .then(function (msg) {
        resolve(msg)
      })
      .catch(function (err) {
        reject(err)
      })
  })
}

function sendEmail (subject, content) {
  var fromEmail = 'haughtonFitManager@gmail.com'
  var toEmail = 'brandon.deron4@gmail.com'
  var pass = fs.readFileSync('password.txt')

  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: fromEmail,
      pass: pass
    }
  })

  var mailOptions = {
    from: fromEmail,
    to: toEmail,
    subject: subject,
    text: content
  }

  return new Promise(function(resolve, reject) {
    transporter.sendMail(mailOptions, function(err, info){
      if (err) {
        console.log(err)
        reject(err)
      } else {
        let msg = 'Email sent: ' + info.response
        resolve(msg)
      }
    })
  })
}

app.use(cors(corsOptions))
app.use(bodyParser.json())
var responseHeaders = { 'content-type': 'application/json' }

// Request for a specific company
app.get('*', function(req, res) {
  console.log('GET Request: ' + req.url)
  res.set(responseHeaders)

})

app.put('*', function(req, res) {
  console.log('PUT Request: ' + req.url)
  res.set(responseHeaders)

})

app.post('*', function(req, res) {
  console.log('POST Request: ' + req.url)
  res.set(responseHeaders)

  if (req.url.includes('email') && req.url.includes('comment')) {
    sendComment(req.body)
      .then(function (msg) {
        console.log(msg)
        res.status(200).end()
      })
      .catch(function (err) {
        console.log(err)
        res.status(500).end()
      })
  }
})

app.delete('*', function(req, res) {
  console.log('DELETE Request: ' + req.url)
  res.set(responseHeaders)

})

var listenPort = '3000'

app.listen(listenPort, () => {
  console.log(`Server running at http://localhost:${listenPort}/`)
})
