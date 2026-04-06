import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';

const validateBody = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    
    if (error) {
      return res.status(422).json({ 
        msg: "Dados inválidos", 
        errors: error.details.map(d => d.message) 
      });
    }
    
    next();
  };
};

export default validateBody;