import { Router } from 'express';
import authRouter from '../resources/auth/auth.router';
import noteRouter from '../resources/note/note.router';

const router = Router();

// Define que tudo que for de autenticação começa com /v1/auth
router.use('/auth', authRouter);

// Define que tudo que for de notas começa com /v1/note
router.use('/note', noteRouter);

export default router;