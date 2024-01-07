import express from 'express'
import 'dotenv/config'
import escape from 'escape-html'

let message = process.env?.["DEFAULT_MESSAGE"] || "I like dancing."
const port = process.env?.["PORT"] || 3000
const password = process.env?.["PASSWORD"] || ""

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
      <div><input id="text" size="60" name="text" value="${escape(message)}" /></div>
      <div><input id="pwd" type="password" name="pwd" /></div>
      <div><input id="submit" type="submit" value="set" /></div>
    </form>
  `))
})

app.post('/set', (req,res) => {
  if (req?.body?.pwd === password){
    message = req?.body?.text
  }
  res.send(page(`
    <div class="controls">
      <a href="set">set</a> 
      <a href=".">view</a>
    </div>
    <div class="message">${escape(message)}</div>
  `))
})

app.get('*', (req, res) => {
  res.send(page(`<div class="message">${escape(message)}</div>`))
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})