import { Router } from 'express';
import bcrypt from 'bcrypt';
import { generateToken, authMiddleware } from '../middleware/auth.js';
import UserRepository from '../repository/user_repository.js';
import EmpresaRepository from '../repository/empresa_repository.js';

const router = Router();
const saltRounds = 10;

router.post('/register/user', async (req, res) => {
    const { nome, email, senha, cargo, localizacao, experiencias } = req.body;

    if (!nome || !email || !senha) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const existingUser = await UserRepository.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        await UserRepository.create(nome, email, hashedPassword, cargo, localizacao, experiencias);

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/register/empresa', async (req, res) => {
    const { nome_empresa, email_corporativo, senha, area_atuacao, tamanho, descricao, localizacao, site } = req.body;

    if (!nome_empresa || !email_corporativo || !senha) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
        const existingEmpresa = await EmpresaRepository.findByEmail(email_corporativo);
        if (existingEmpresa) {
            return res.status(409).json({ message: 'Company with this email already exists' });
        }

        const hashedPassword = await bcrypt.hash(senha, saltRounds);

        await EmpresaRepository.create(nome_empresa, email_corporativo, hashedPassword, area_atuacao, tamanho, descricao, localizacao, site);

        res.status(201).json({ message: 'Company created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/login', async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
        let user = await UserRepository.findByEmail(email);
        let accountType = 'user';

        if (!user) {
            user = await EmpresaRepository.findByEmail(email);
            accountType = 'empresa';
        }

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const isPasswordCorrect = await bcrypt.compare(senha, user.senha);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = await generateToken({ id: user.id, role: accountType });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.get('/datajwt', authMiddleware, (req, res) => {
    res.json({ jwt_data: req.user });
});

export default router;
