import { Api } from "../api";

export class AlterarSenhaAlunoService {
    alterarSenha(senhaAtual: string, novaSenha: string) {
        return new Api().put('aluno/senha', { senhaAtual, novaSenha });
    }
}
