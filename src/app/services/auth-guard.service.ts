import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { LoginRegisterService } from './login-register.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router:Router,private loginRegisterService:LoginRegisterService) { }

  canActivate(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){

    let user=localStorage.getItem("justDoItUser");

   if(this.loginRegisterService.isLoggedIn() && user) return true;
    

   //this.router.navigate(["/account"],{queryParams:{'redirectUrl': state.url}});
   this.router.navigate(["/account"]);
   return false;

  }
}
