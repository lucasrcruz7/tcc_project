import { Api } from "../api";
import { AlunoCadastro } from "../../types/AlunoCadastro";

export class AlunoCadastroService {
    cadastrar(data: AlunoCadastro) {
        return new Api().post('alunos', data);
    }
}
