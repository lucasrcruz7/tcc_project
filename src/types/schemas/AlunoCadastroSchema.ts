import { z } from "zod";

export const AlunoCadastroSchema = z.object({
    nome: z.string().min(1, "Campo obrigatório"),
    responsavelEmail: z.email("Email responsável inválido"),
    email: z.email("Email válido obrigatório"),
    curso: z.enum(["DS", "ADM"]),
    turma: z.enum(["Manhã", "Tarde", "Noite"]),
    telefone: z.string().min(11, "Telefone inválido"),
    serie: z.enum(["primeiro_ano", "segundo_ano", "terceiro_ano"]),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres")
});
