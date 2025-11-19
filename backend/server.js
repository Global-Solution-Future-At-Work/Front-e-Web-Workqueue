import express from "express"
import cors from "cors"
import verify_db from "./functions/database_verify.js"

const app = express()
const port = 3000

verify_db()

app.use(cors())
app.use(express.json())

app.get('/healthcheck', (req, res) => {
  res.send("Ok!")
})

app.listen(port, () => {
  console.log(`Rodando na porta: ${port}`)
})