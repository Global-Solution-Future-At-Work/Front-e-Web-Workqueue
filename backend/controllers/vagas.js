import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const vagasPath = path.join(__dirname, '..', 'data', 'vagas.json');

// LISTAR TODAS AS VAGAS
router.get('/api/vagas', (req, res) => {
    if (!fs.existsSync(vagasPath)) {
        return res.json([]); // Se não existir arquivo, retorna lista vazia
    }

    fs.readFile(vagasPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "Erro ao ler vagas." });
        try {
            const vagas = JSON.parse(data);
            res.json(vagas);
        } catch (e) {
            res.status(500).json({ error: "Erro no JSON de vagas." });
        }
    });
});

// DELETAR UMA VAGA
router.delete('/api/vagas/:id', (req, res) => {
    const { id } = req.params;

    fs.readFile(vagasPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: "Erro ao ler vagas." });

        let vagas = JSON.parse(data);
        const novaLista = vagas.filter(v => v.id !== id);

        if (vagas.length === novaLista.length) {
            return res.status(404).json({ error: "Vaga não encontrada." });
        }

        fs.writeFile(vagasPath, JSON.stringify(novaLista, null, 2), (err) => {
            if (err) return res.status(500).json({ error: "Erro ao salvar." });
            res.json({ message: "Vaga deletada com sucesso!", vagas: novaLista });
        });
    });
});

export default router;