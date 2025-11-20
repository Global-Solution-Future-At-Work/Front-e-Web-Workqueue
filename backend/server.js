import express from "express"
import cors from "cors"
import verify_db from "./functions/database_verify.js"
import login_register_routes from "./controllers/login_register.js"
import admin from "./controllers/admin.js"
import user from "./controllers/user.js"

const app = express()
const port = 3000

verify_db()

app.use(cors())
app.use(express.json())

app.use(login_register_routes)
app.use(admin)
app.use(user)

app.get('/healthcheck', (req, res) => {
  res.send("Ok!")
})

app.listen(port, () => {
  console.log(`Rodando na porta: ${port}`)
})