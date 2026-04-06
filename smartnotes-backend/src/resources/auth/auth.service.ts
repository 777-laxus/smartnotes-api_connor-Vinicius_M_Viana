import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { SignupDTO, LoginDTO } from './auth.types';

const prisma = new PrismaClient();

export const signup = async (data: any) => {
  // 1. Verificamos se o usuário já existe
  const userExists = await prisma.user.findUnique({ 
    where: { email: data.email } 
  });
  
  if (userExists) return null;

  // 2. Criptografia da senha
  const hashedPassword = await bcrypt.hash(data.password, 10);

  /**
   * 3. Mapeamento de campos (O PONTO CRÍTICO):
   * O Prisma exige 'fullname'. Se o front enviar 'name' ou 'nome',
   * nós garantimos que ele seja salvo na coluna correta.
   */
  return await prisma.user.create({
    data: {
      email: data.email,
      password: hashedPassword,
      fullname: data.fullname || data.name || data.nome,
    },
  });
};

export const checkCredentials = async (credentials: LoginDTO) => {
  const user = await prisma.user.findUnique({ 
    where: { email: credentials.email } 
  });
  
  // PROTEÇÃO CONTRA TIMING ATTACK:
  // Usamos um hash de estrutura válida para o bcrypt não falhar por formato
  const dummyHash = "$2b$10$S9K9pCAZ9ar6T9D9.9999u9999999999999999999999999999999";
  const passwordToCompare = user ? user.password : dummyHash;
  
  const isValid = await bcrypt.compare(credentials.password, passwordToCompare);

  if (!user || !isValid) return null;
  
  return user;
};