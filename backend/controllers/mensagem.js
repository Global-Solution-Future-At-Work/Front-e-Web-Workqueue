import { Router } from 'express';
import MensagemRepository from '../repository/mensagem_repository.js'; 

const router = Router();

router.get('/', async (req, res) => {
    try {
        const mensagens = await MensagemRepository.read();
        res.status(200).json(mensagens);
    } catch (error) {
        res.status(500).json({ error: "Erro ao ler mensagens." });
    }
});

router.post('/', async (req, res) => {
    const { id_empresa, id_user, mensagem, enviado_por } = req.body;

    if (!mensagem || !id_empresa || !id_user || !enviado_por) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios: id_empresa, id_user, mensagem, enviado_por." });
    }

    try {
        await MensagemRepository.create(id_empresa, id_user, mensagem, enviado_por);
        res.status(201).json({ message: "Mensagem enviada com sucesso!" });
    } catch (error) {
        res.status(500).json({ error: "Erro ao salvar mensagem." });
    }
});

router.get('/historico/:tipo/:id', async (req, res) => {
    const { tipo, id } = req.params;

    if (tipo !== 'user' && tipo !== 'empresa') {
        return res.status(400).json({ error: "O tipo deve ser 'user' ou 'empresa'." });
    }

    try {
        const todasMensagens = await MensagemRepository.read();

        // Filtra conversas onde o ID participa
        const mensagensFiltradas = todasMensagens.filter(msg => {
            if (tipo === 'user') {
                // Usuário vê as mensagens onde ele é o id_user
                return String(msg.id_user) === String(id);
            } else if (tipo === 'empresa') {
                // Empresa vê as mensagens onde ela é a id_empresa
                return String(msg.id_empresa) === String(id);
            }
        });

        res.status(200).json(mensagensFiltradas);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao filtrar mensagens." });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const resultado = await MensagemRepository.delete(id);
        if (resultado === 1) {
            res.status(200).json({ message: "Mensagem deletada." });
        } else {
            res.status(404).json({ error: "Mensagem não encontrada." });
        }
    } catch (error) {
        res.status(500).json({ error: "Erro ao deletar." });
    }
});

export default router;