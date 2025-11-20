import { Router } from "express"
import EmpresaRepository from "../repository/empresa_repository.js" // Ajuste o caminho conforme sua estrutura
import { authMiddleware } from '../middleware/auth.js';
import AdminRepository from "../repository/admin_repository.js";

const router = Router()

// --- Rotas Públicas ou Protegidas (dependendo da sua regra de negócio) ---

// Listar todas as empresas
router.get("/empresa", authMiddleware, async (req, res) => {
    const empresas = await EmpresaRepository.read()
    res.json(empresas)
})

// Buscar empresa por ID (Adicionei esta pois seu Repositório tem o método findById)
router.get("/empresa/:id", authMiddleware, async (req, res) => {
    const { id } = req.params
    const empresa = await EmpresaRepository.findById(id)
    
    if (empresa) {
        res.json(empresa)
    } else {
        res.status(404).send("Empresa não encontrada")
    }
})

// Criar uma nova empresa
router.post("/empresa", authMiddleware, async (req, res) => {
    // Desestruturando na ordem que o repositório espera, ou passando diretamente
    const { 
        nome_empresa, 
        email_corporativo, 
        senha, 
        area_atuacao, 
        tamanho, 
        descricao, 
        localizacao, 
        site 
    } = req.body;

    // O método create do seu repositório espera argumentos posicionais
    await EmpresaRepository.create(
        nome_empresa, 
        email_corporativo, 
        senha, 
        area_atuacao, 
        tamanho, 
        descricao, 
        localizacao, 
        site
    )
    
    res.status(201).send("Empresa criada com sucesso")
})

// Deletar uma empresa
router.delete("/empresa/:id", authMiddleware, async (req, res) => {
    const { id } = req.params
    const result = await EmpresaRepository.delete(id)
    
    // O repositório retorna 1 se deletou, ou -1 se falhou
    if (result === 1) {
        res.send("Empresa deletada com sucesso")
    } else {
        res.status(404).send("Empresa não encontrada para deletar")
    }
})

// Atualizar uma empresa
router.put("/empresa/:id", authMiddleware, async (req, res) => {
    const { id } = req.params
    const { 
        nome_empresa, 
        email_corporativo, 
        senha, 
        area_atuacao, 
        tamanho, 
        descricao, 
        localizacao, 
        site 
    } = req.body

    const result = await EmpresaRepository.update(
        id, 
        nome_empresa, 
        email_corporativo, 
        senha, 
        area_atuacao, 
        tamanho, 
        descricao, 
        localizacao, 
        site
    )

    if (result === 1) {
        res.send("Empresa atualizada com sucesso")
    } else {
        res.status(404).send("Empresa não encontrada para atualizar")
    }
})

//---
//admin routes
router.get("/empresaadmin", async (req, res) => {
    let data = await AdminRepository.read()
    if (req.headers["admin_code"] === data.codigo) {
        res.json(await EmpresaRepository.read())
    } else {
        res.status(401).send("Código errado...")
    }
})

router.delete("/empresaadmin/:id", async (req, res) => {
    const { id } = req.params
    let data = await AdminRepository.read()
    if (req.headers.admin_code === data.codigo) {
        await EmpresaRepository.delete(id)
        res.send("Deletado com sucesso")
    } else {
        res.status(401).send("Código errado...")
    }
})

export default router