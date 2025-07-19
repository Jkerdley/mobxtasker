import { Router } from 'express';
import { authRouter } from './auth.js';
import { todoRouter } from './todo.js';

export const router = Router();

router.use('/auth', authRouter)
router.use('/todos', todoRouter)
