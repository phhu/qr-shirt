import express from 'express'
import 'dotenv/config'

let message = process.env?.["DEFAULT_MESSAGE"] || "I like dancing"
const password = process.env?.["PASSWORD"] || ""
const port = process.env?.["PORT"] || 3000

const app = express()
app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


const page = content => `<!DOCTYPE html>

<html>
<head>
<link rel="stylesheet" href="style.css"> 
</head>
<body>

${content}

<body>
</head>
`

app.get('/set', (req,res) => {
  res.send(page(`    
      <form method="post" >
      <div><input size="40" name="text" value="${message}" /></div>
      <div><input type="password" name="pwd" /></div>
      <div><input type="submit" value="set" /></div>
    </form>
  `))
})

app.post('/set', (req,res) => {
  if (req?.body?.pwd === password){
    message = req?.body?.text
  }
  res.send(`<div class="controls">
      <a href="set">set</a> 
      <a href=".">view</a>
    </div>
    <div class="message">${message}</div>`)
})

app.get('*', (req, res) => {
  res.send(page(`<div class="message">${message}</div>`))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})