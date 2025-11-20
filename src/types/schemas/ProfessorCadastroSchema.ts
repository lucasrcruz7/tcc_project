import { z } from "zod";

export const ProfessorCadastroSchema = z.object({
    nome: z.string().min(1, "Campo obrigatório"),
    email: z.email("Email válido obrigatório"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres")
});
