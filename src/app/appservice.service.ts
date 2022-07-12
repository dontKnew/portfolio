import { HttpClient, HttpHeaders, HttpErrorResponse,HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AppserviceService {
  isAuthUser:boolean = false;
  loginBtnText:string = "Login";
  LoginHeader:boolean = false;
  constructor(private route:Router, private http:HttpClient) { }
  // url = "http://localhost/PHP/Development/failureboyAPI/api/";
  url = "https://failureboy.com/failureboyAPI/api/";

  addUser(data:any){
    return this.http.post<any>(this.url+"create.php?user=1",data).pipe(map((res:any)=>{
      return res;
    }));
  }
  
  addUserByImage(data:any){
    return this.http.post<any>(this.url+"create.php?userImage=1",data).pipe(map((res:any)=>{
      return res;
    }));
  }

  isUserLogin(email:any, password:any){ 
    return this.http.get<any>(this.url+`single_read.php?userlogin=1&email=${email}&password=${password}`).pipe(map((res:any)=>{
      return res;
    }));
  }

  isAuthenticatedUser(){
    if(localStorage.getItem("isUserLogged")==="true"){
      this.isAuthUser = true;
      this.loginBtnText = "Logout";
      return true;
    }else {
        this.isAuthUser = false;
        this.loginBtnText = "Login";
        return false;
    }
  }

  loginUser(email:any){
    this.isAuthUser=true;
    this.loginBtnText = "Logout";
    localStorage.setItem("isUserLogged", "true");
    const newLocal = "sessionUserEmail";
    localStorage.setItem(newLocal, email);        
  }

  logoutUser(){
    this.loginBtnText = "Login";
    this.isAuthUser = false;
    localStorage.setItem("isUserLogged", "false");
    localStorage.removeItem('sessionUserEmail');
     // localStorage.clear();
  }
}
