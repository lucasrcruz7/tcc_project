import { Api } from "../api";
import { ProfessorCadastro } from "../../types/ProfessorCadastro";

export class ProfessorCadastroService {
    cadastrar(data: ProfessorCadastro) {
        return new Api().post('professores', data);
    }
}
