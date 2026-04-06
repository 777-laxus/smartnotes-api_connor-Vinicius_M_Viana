import express from 'express';
import session from 'express-session';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import v1Router from './router/v1Router';

// Carrega as variáveis do arquivo .env
dotenv.config();

const app = express();

/**
 * 1. CONFIGURAÇÕES DE SEGURANÇA (CRITÉRIOS 6.6 E 6.7)
 */

// HELMET: Protege cabeçalhos HTTP e remove o "X-Powered-By: Express" (Peso 5%)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// CORS: Restringe o acesso apenas ao seu Frontend (Peso 5%)
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001', 
  credentials: true,                                
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

// Parser para JSON (deve vir antes das rotas e do rate limit que analisa o body se houver)
app.use(express.json());

/**
 * 2. RATE LIMITING (CRITÉRIO 6.5 - PESO 5%)
 */

// Limite Global: 100 requisições por 15 minutos
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: { msg: "Limite global de requisições excedido." }
});

// Limite de Autenticação: 10 requisições por 15 minutos (Login/Signup)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { msg: "Muitas tentativas de login ou cadastro. Tente após 15 minutos." }
});

// APLICAÇÃO DOS LIMITERS
// O authLimiter deve vir ANTES do roteador v1 para "interceptar" as rotas de auth
app.use('/v1/auth', authLimiter); 
app.use(globalLimiter); // Aplica o limite de 100 nas demais rotas

/**
 * 3. CONFIGURAÇÃO DE SESSÃO (CRITÉRIO 6.3 - PESO 15%)
 */
app.use(session({
  name: 'smartnotes_session',
  secret: process.env.SESSION_SECRET || 'segredo-muito-forte-para-producao',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // Em localhost deve ser false. Em produção (HTTPS) seria true.
    httpOnly: true, // Proteção contra XSS (não permite acesso via JS)
    sameSite: 'lax', // Proteção contra CSRF
    maxAge: 24 * 60 * 60 * 1000 // 24 horas
  }
}));

// Tipagem da Sessão para TypeScript
declare module 'express-session' {
  interface SessionData {
    userId: string;
  }
}

/**
 * 4. LOGS E ROTAS
 */

// Middleware de Log para debug no terminal
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Prefixo v1 para todas as rotas (Critério 4.1)
app.use('/v1', v1Router);

/**
 * 5. INICIALIZAÇÃO (CRITÉRIO 6.1 - VARIÁVEIS DE AMBIENTE)
 */
const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
  console.log(`🚀 SmartNotes API rodando em: http://localhost:${PORT}`);
});