import { Request, Response, NextFunction } from 'express';

export default function isAuth(req: Request, res: Response, next: NextFunction) {
  console.log("Cookie recebido no isAuth:", req.headers.cookie);
  console.log("Sessão atual:", req.session);

  if (req.session && req.session.userId) {
    return next();
  }
  
  return res.status(401).json({ msg: "Sessão expirada ou usuário não autenticado" });
}