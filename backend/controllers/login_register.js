import { Router } from 'express';
import { generateToken, authMiddleware } from './auth.js';

const router = Router();

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === '123') {
        const token = generateToken({ id: 1, role: 'admin' });
        return res.json({ token });
    }

    res.status(401).json({ message: 'Erro no login' });
});

router.post('/cadastro-empresa', (req, res) => {
    const { 
        name,
        email, 
        password,
        confirm_password,
        work_field,
        experience_level,
        address,
    } = req.body


})

router.get('/perfil', authMiddleware, (req, res) => {
    res.json({ user: req.user });
});

export default router;