import { Router } from "express"
import RecomendacoesRepository from "../repository/recomendacoes_repository.js" 
import AdminRepository from "../repository/admin_repository.js"
import { authMiddleware } from '../middleware/auth.js';

const router = Router()

router.get("/recomendacao/user/:id", async (req, res) => {
    const { id } = req.params
    
    const recomendacoes = await RecomendacoesRepository.findByUserId(id)
    
    res.json(recomendacoes)
})

router.post("/recomendacao", authMiddleware, async (req, res) => {
    const { id_user, mensagem } = req.body

    if (!id_user || !mensagem) {
        return res.status(400).send("ID do usuário e mensagem são obrigatórios.")
    }

    await RecomendacoesRepository.create(id_user, mensagem)
    
    res.status(201).send("Recomendação enviada com sucesso")
})

router.delete("/recomendacao/:id", authMiddleware, async (req, res) => {
    const { id } = req.params
    const result = await RecomendacoesRepository.delete(id)
    
    if (result === 1) {
        res.send("Recomendação deletada")
    } else {
        res.status(404).send("Recomendação não encontrada")
    }
})

router.get("/recomendacaoadmin", async (req, res) => {
    let data = await AdminRepository.read()
    
    if (req.headers["admin_code"] === data.codigo) {
        const recomendacoes = await RecomendacoesRepository.findAll()
        res.json(recomendacoes)
    } else {
        res.status(401).send("Código de administrador inválido.")
    }
})

router.delete("/recomendacaoadmin/:id", async (req, res) => {
    const { id } = req.params
    let data = await AdminRepository.read()

    if (req.headers["admin_code"] === data.codigo) {
        const result = await RecomendacoesRepository.delete(id)
        
        if (result === 1) {
            res.send("Recomendação deletada com sucesso")
        } else {
            res.status(404).send("Recomendação não encontrada")
        }
    } else {
        res.status(401).send("Código de administrador inválido.")
    }
})

export default router