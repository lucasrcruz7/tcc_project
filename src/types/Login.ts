import z from "zod";
import { LoginSchema, AdminLoginSchema, AlunoLoginSchema, ProfessorLoginSchema } from "./schemas/LoginSchema";


export type Login = z.infer<typeof LoginSchema>

export type AdminLogin = z.infer<typeof AdminLoginSchema>

export type AlunoLogin = z.infer<typeof AlunoLoginSchema>

export type ProfessorLogin = z.infer<typeof ProfessorLoginSchema>


