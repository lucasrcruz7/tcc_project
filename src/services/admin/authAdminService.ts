import { AdminLogin } from "../../types/Login";
import { Api } from "../api";


export class AuthAdminService{
    login(data: AdminLogin ){
        return new Api().post('login/admin', data)
    }
}