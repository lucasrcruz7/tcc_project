import { z } from "zod";
import { AlunoCadastroSchema } from "./schemas/AlunoCadastroSchema";

export type AlunoCadastro = z.infer<typeof AlunoCadastroSchema>;
