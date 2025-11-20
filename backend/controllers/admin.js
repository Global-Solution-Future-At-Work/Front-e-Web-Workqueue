import { Router } from "express"
import AdminRepository from "../repository/admin_repository.js"
import ping from "ping"
const router = Router()

router.post("/admin", async (req, res) => {
    let data = await AdminRepository.read()
    if (req.body.codigo === data.codigo) {
        res.status(200).send("Ok!")
    } else {
        res.status(401).send("Código errado...")
    }
})

router.get("/admin/gemini_status", async (req, res) => {
    const host = 'https://generativelanguage.googleapis.com/';
    try {
        const gemini = await ping.promise.probe(host);
        res.send("Conectado.")    
    } catch (err) {
        res.send("Desconectado.")
    }

})

export default router