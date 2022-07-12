import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UnSecurePageGuard implements CanActivate {
  constructor(private auth:AuthService, private router:Router,){}
  canActivate(route: ActivatedRouteSnapshot, tstate: RouterStateSnapshot):boolean | Promise<boolean>{
    if(this.auth.isLogin()){
        this.router.navigate(['/dashboard']);
    }
    return true;  
 }
  
}
