import { AlunoLogin } from "../../types/Login";
import { Api } from "../api";


export class AuthAlunoService{
    login(data: AlunoLogin ){
        return new Api().post('login/aluno', data)
    }
}