export interface SignupDTO {
  email: string;
  password: string;
  fullname: string;
  name?: string; // Opcional para não quebrar se vier do front
}

export interface LoginDTO {
  email: string;
  password: string;
}