import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { LoginRegisterService } from './login-register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router,private loginRegisterService:LoginRegisterService) { }

  canActivate(){
    let user=localStorage.getItem("justDoItUser");

   if(this.loginRegisterService.isLoggedIn() && user) return true;

   this.router.navigate(["/account"]);
   return false;

  }
}
