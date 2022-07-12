import { Injectable } from "@angular/core";
Injectable();
export class AuthService {
    loggedIn:boolean = false;
    loginBtnText:string = "Author Login";
    constructor(){this.loginBtnText}
    logout(){
        this.loggedIn = false;
        localStorage.setItem("isLogged", "false");
        localStorage.removeItem('sessionEmail');
         // localStorage.clear();
         this.loginBtnText = "Author Login";
    }
    login(email:any){
        this.loggedIn=true;
        localStorage.setItem("isLogged", "true");
        const newLocal = "sessionEmail";
        localStorage.setItem(newLocal, email);        
    }

    isLogin(){
        if(localStorage.getItem("isLogged")==="true"){
            this.loggedIn = true;
            this.loginBtnText = "Logout";
            return true;
        }else {
            this.loggedIn = false;
            this.loginBtnText = "Author Login";
            return false;
        }
    }
}
