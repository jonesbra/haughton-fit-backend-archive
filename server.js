var http = require('http')
var express = require('express')
var app = express()
var cors=require('cors')
var bodyParser = require('body-parser')

var corsOptions = {
  credentials: true,
  origin: function (origin, callback) {
    callback(null, true)
  }
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

})

app.delete('*', function(req, res) {
  console.log('DELETE Request: ' + req.url)
  res.set(responseHeaders)

})

var listenPort = '3000'

app.listen(listenPort, () => {
  console.log(`Server running at http://localhost:${listenPort}/`)
})
