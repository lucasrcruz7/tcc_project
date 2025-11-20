
import { ProfessorLogin } from "../../types/Login";
import { Api } from "../api";


export class AuthProfessorService{
    login(data: ProfessorLogin ){
        return new Api().post('login/professor', data)
    }
}