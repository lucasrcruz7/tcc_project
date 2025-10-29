import { z } from "zod";

export const AdminLoginSchema = z.object({
    mode: z.literal("admin"),
    senha: z.string(),
    email: z.email("Email inválido"),
})
export const AlunoLoginSchema = z.object({
    mode: z.literal("aluno"),
    senha: z.string().min(1, "Campo Obrigatório"),
    rm: z.coerce.number()
})

export const LoginSchema = z.discriminatedUnion("mode", [
   AdminLoginSchema ,
   AlunoLoginSchema
]);