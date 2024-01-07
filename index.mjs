import express from 'express'
import 'dotenv/config'

const app = express()
const port = process.env?.["PORT"] || 3000
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

let message = process.env?.["DEFAULT_MESSAGE"] || "I like dancing"
const password = process.env?.["PASSWORD"]

app.get('/set', (req,res) => {
  res.send(`
    <form method="post" >
      <div><input size="40" name="text" value="${message}" /></div>
      <div><input type="password" name="pwd" /></div>
      <div><input type="submit" value="set" /></div>
    </form>
  `)
})

app.post('/set', (req,res) => {
  if (req?.body?.pwd === password){
    message = req?.body?.text
  }
  res.send(`${message} <br /><a href="set">set</a> <a href=".">view</a>`)
})

app.get('*', (req, res) => {
  res.send(`<br /> <br /><center><h1>${message}</h1></center>`)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})