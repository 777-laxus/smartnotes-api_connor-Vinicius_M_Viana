import { Router } from 'express';
import * as authController from './auth.controller';
import validateBody from '../../middlewares/validateBody';
import { signupSchema, loginSchema } from './auth.schema'; // Certifique-se de importar o loginSchema

const router = Router();

router.post('/signup', validateBody(signupSchema), authController.signup);

router.post('/login', validateBody(loginSchema), authController.login);


router.post('/logout', authController.logout);

export default router;