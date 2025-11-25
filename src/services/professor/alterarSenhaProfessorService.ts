import { Api } from "../api";

export class AlterarSenhaProfessorService {
    alterarSenha(senhaAtual: string, novaSenha: string) {
        return new Api().put('professor/senha', { senhaAtual, novaSenha });
    }
}
