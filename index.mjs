import express from 'express'

const app = express()
const port = 3000
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let message = "hello, I like dancing."
const password = "banana"

app.get('/set', (req,res) => {
  res.send(`
    <form method="post" action="/set">
      <input size="40" name="text" />
      <input type="password" name="pwd" />
      <input type="submit" />
    </form>
  `)
})

app.post('/set', (req,res) => {
  if (req.body.pwd === password){
    message = req.body.text
  }
  res.send(`${message} <br /><a href="/set">set</a>`)
})

app.get('*', (req, res) => {
  res.send(message)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

