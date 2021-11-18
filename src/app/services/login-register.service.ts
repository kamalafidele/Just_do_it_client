import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {
  http:HttpClient;
  constructor(http:HttpClient,private jwtHelper:JwtHelperService) {
    this.http=http;
   }

   login(data:any):any{
     return this.http.post("http://localhost:4500/api/justdoit/users/login",data);
   }

   register(data:any):any{
    return this.http.post("http://localhost:4500/api/justdoit/users/register",data);
   }

   verifyEmail(data:any){
     return this.http.post("http://localhost:4500/api/justdoit/users/confirmEmail",data);
   }

   isLoggedIn() : boolean{
     let token=localStorage.getItem("justDoitTokAuth");
     if(!token)
        return false;
    
    let isExpired=this.jwtHelper.isTokenExpired(token);
    
     return !isExpired;
   }
}
