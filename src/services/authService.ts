import { Api } from "./api";


export class AuthService{
   getUser(){
        return new Api().get('auth/user')
    }
}