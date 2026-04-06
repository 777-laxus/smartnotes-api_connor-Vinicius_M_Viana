import Joi from 'joi';

// Schema para Criação de Usuário (Critério 5 - Senha Forte)
export const signupSchema = Joi.object({
  email: Joi.string().email().max(100).required(),
  fullname: Joi.string().max(100).required(),
  password: Joi.string()
    .min(8)
    .max(128)
    .pattern(new RegExp('(?=.*[a-z])')) // Letra minúscula
    .pattern(new RegExp('(?=.*[A-Z])')) // Letra maiúscula
    .pattern(new RegExp('(?=.*[0-9])')) // Número
    .pattern(new RegExp('(?=.*[!@#$%^&*])')) // Especial
    .required()
    .messages({
      'string.pattern.base': 'A senha deve conter maiúsculas, minúsculas, números e caracteres especiais.',
      'string.min': 'A senha deve ter no mínimo 8 caracteres.'
    })
});

// Schema para Login (Critério 4.1)
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});