📝 SmartNotes - API de Gerenciamento de Notas

📁 Estrutura do Projeto
/api: Backend Node.js / Express / Prisma ORM / MySQL.

/web: Frontend React / Next.js.

🔒 Implementações de Segurança e Arquitetura
Para este projeto, foram priorizados os critérios técnicos de proteção de dados e integridade de sessão:

🛡️ Autenticação e Gestão de Sessão (Critério 6)
Persistent Sessions (6.3): Implementação via express-session com persistência em banco de dados e cookies configurados com flags HttpOnly e SameSite: Lax para mitigação de XSS e CSRF.

Timing Attack Prevention (6.8): Lógica de comparação de hash de tempo constante no Controller, utilizando dummy hashes para garantir que o tempo de resposta seja idêntico para usuários existentes ou inexistentes.

Rate Limiting (6.5): Camada de proteção contra ataques de força bruta no endpoint de login (15min window / 10 requests).

⚙️ Infraestrutura e Validação (Critério 4 e 5)
Data Integrity (5): Esquema de validação rigoroso com Joi, exigindo complexidade de senha (uppercase, lowercase, especial e numérico).

Security Headers (6.6): Integração do Helmet para controle de Content-Security-Policy, X-Frame-Options e proteção contra MIME-sniffing.

Global Error Handling (4.2): Middlewares de captura de exceções garantindo Status 500 para falhas críticas, sem vazamento de stack traces em produção.

CORS Policy (6.7): Configuração restritiva de origens e métodos permitidos.

🛠️ Stack Técnica
Runtime: Node.js + TypeScript

ORM: Prisma

Auth: Bcryptjs + Express-Session

Middleware: Helmet, Cors, Express-Rate-Limit
