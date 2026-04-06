import { Request, Response } from 'express';
import * as authService from './auth.service';

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, fullname, name } = req.body;

    // O Service já lida com a verificação de existência e o hash
    const user = await authService.signup({ 
      email, 
      password, 
      fullname: fullname || name 
    });
    
    if (!user) {
      return res.status(400).json({ msg: "Este e-mail já está em uso." });
    }

    return res.status(201).json({
      msg: "Conta criada com sucesso!",
      user: { id: user.id, email: user.email }
    });

  } catch (error: any) {
    console.error("ERRO NO SIGNUP:", error.message);
    return res.status(500).json({ msg: "Erro interno no servidor." });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // O checkCredentials no seu Service já possui o Timing Attack (Dummy Hash)
    const user = await authService.checkCredentials({ email, password });
    
    if (!user) {
      return res.status(401).json({ msg: "E-mail ou senha incorretos." });
    }

    // Configuração da Sessão (Critério 6.3)
    req.session.userId = user.id;

    req.session.save((err) => {
      if (err) return res.status(500).json({ msg: "Erro ao salvar sessão." });
      return res.status(200).json({ 
        msg: "Login realizado!", 
        user: { id: user.id, email: user.email } 
      });
    });
  } catch (error: any) {
    console.error("ERRO NO LOGIN:", error.message);
    return res.status(500).json({ msg: "Erro interno no servidor." });
  }
};

export const logout = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ msg: "Erro ao encerrar sessão." });
    
    // Nome do cookie definido no seu index.ts
    res.clearCookie('smartnotes_session'); 
    
    return res.status(200).json({ msg: "Até logo!" });
  });
};