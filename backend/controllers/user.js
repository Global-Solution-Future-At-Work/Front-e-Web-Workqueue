import { Router } from "express"
import AdminRepository from "../repository/admin_repository.js"
import { generateToken, authMiddleware } from '../middleware/auth.js';
import UserRepository from "../repository/user_repository.js";

const router = Router()

router.get("/user", authMiddleware, async (req, res) => {
    res.json(await UserRepository.read())
})

router.post("/user", authMiddleware, async (req, res) => {
    const { nome, email, senha, cargo, localizacao, experiencias } = req.body;
    await UserRepository.create(nome, email, senha, cargo, localizacao, experiencias)
    res.send("Criado com sucesso")
})

router.delete("/user/:id", authMiddleware, async (req, res) => {
    const { id } = req.params
    await UserRepository.delete(id)
    res.send("Deletado com sucesso")
})

router.put("/user/:id", authMiddleware, async (req, res) => {
    const { id } = req.params
    const { nome, email, senha, cargo, localizacao, experiencias, foto, resumo, area, habilidadesTecnicas, softSkills, formacao, projetos, certificacoes, idiomas, areaInteresses } = req.body
    await UserRepository.update(id, nome, email, senha, cargo, localizacao, experiencias, foto, resumo, area, habilidadesTecnicas, softSkills, formacao, projetos, certificacoes, idiomas, areaInteresses)
    res.send("Atualizado com sucesso")
})

//admin routes

router.get("/useradmin", async (req, res) => {
    let data = await AdminRepository.read()
    if (req.headers["admin_code"] === data.codigo) {
        res.json(await UserRepository.read())
    } else {
        res.status(401).send("Código errado...")
    }
})

router.delete("/useradmin/:id", async (req, res) => {
    const { id } = req.params
    let data = await AdminRepository.read()
    if (req.headers.admin_code === data.codigo) {
        await UserRepository.delete(id)
        res.send("Deletado com sucesso")
    } else {
        res.status(401).send("Código errado...")
    }
})
export default router
