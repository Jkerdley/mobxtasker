import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMiddleware.js';
import { todoService } from '../services/todoService.js';

export const todoRouter = Router();

todoRouter.use(authMiddleware);

todoRouter.get('/', (req, res) => {
    const result = todoService.get(req.user);

    res.status(result.success ? 200 : 400).json(result);
})

todoRouter.post('/', (req, res) => {
    const result = todoService.create(req.user, req.body.title);

    res.status(result.success ? 200 : 400).json(result);
})

todoRouter.patch('/:id', (req, res) => {
    const result = todoService.update(req.user, req.params.id, req.body);

    res.status(result.success ? 200 : 400).json(result);
})

todoRouter.delete('/:id', (req, res) => {
    const result = todoService.delete(req.user, req.params.id, req.body.password);

    res.status(result.success ? 200 : 400).json(result);
})
