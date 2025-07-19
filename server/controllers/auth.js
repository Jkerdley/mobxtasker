import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { authService } from '../services/authService.js';

export const authRouter = Router();

authRouter.get('/check', authMiddleware, (_, res) => {
    res.json({ success: true });
})

authRouter.post('/register', (req, res) => {
    const result = authService.register(req.body.login, req.body.password);

    res.status(result.success ? 200 : 400).json(result);
})

authRouter.post('/login', (req, res) => {
    const result = authService.login(req.body.login, req.body.password);

    res.status(result.success ? 200 : 400).json(result);
})

authRouter.post('/refresh', (req, res) => {
    const result = authService.refresh(req.body.refresh);

    res.status(result.success ? 200 : 400).json(result);
})

authRouter.post('/logout', authMiddleware, (req, res) => {
    const result = authService.logout(req.body.login);

    res.status(result.success ? 200 : 400).json(result);
})
