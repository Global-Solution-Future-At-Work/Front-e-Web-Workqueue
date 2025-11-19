import express from "express"

const app = express()
const port = 3000

app.use(express.json())

app.get('/healthcheck', (req, res) => {
  res.send("Ok!")
})

app.listen(port, () => {
  console.log(`Rodando na porta: ${port}`)
})