import { Router } from 'express';
import * as noteController from './note.controller';
import { noteSchema } from './note.schema';
import validateBody from '../../middlewares/validateBody';
import isAuth from '../../middlewares/isAuth';

const router = Router();

// Todas as rotas de notas precisam de login
router.use(isAuth);

router.get('/', noteController.index);
router.post('/', validateBody(noteSchema), noteController.create);
router.get('/:id', noteController.read);
router.put('/:id', validateBody(noteSchema), noteController.update);
router.delete('/:id', noteController.remove);

export default router;