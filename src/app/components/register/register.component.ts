import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/services/login-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  {

  username="";
  email="";
  password="";
  confirmPassword="";
  error="";
  withErrors=false;
  registerService;
  firstStepCompleted:boolean= false;
  isLoading=false;

  constructor(http:LoginRegisterService,private router:Router) { 
      this.registerService=http;
  }

  register(){
    this.isLoading=true;
    let data={username:this.username,email:this.email,password:this.password,confirmPassword:this.confirmPassword};
    this.registerService.register(data)
    .subscribe((res:any) =>{
      this.isLoading=false;

        if(res.message){
          this.router.navigate(["emailSent"]);
        }

    },
    (err:any) =>{
      this.isLoading=false;
      this.withErrors=true;
      this.error=err.error.error;
    })}

  checkStep(){
    if(this.username !== "" && this.email !=="")
       this.firstStepCompleted=true;
  }
}
