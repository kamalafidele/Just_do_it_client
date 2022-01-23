import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginRegisterService } from 'src/app/services/login-register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string="";
  password:string="";
  loginService;
  error="";
  withErrors=false;
  isLoading=false;

  constructor(http:LoginRegisterService,private router:Router, private route:ActivatedRoute) {
    this.loginService=http;
   }


  login(){
    this.isLoading=true;
    let data={email:this.email,password:this.password};
    this.loginService.login(data)
    .subscribe((res:any) =>{
      this.isLoading=false;
      
      localStorage.setItem("justDoitTokAuth",res.token);
      localStorage.setItem("justDoItUser",JSON.stringify(res.user));
      
     // let returnUrl=this.route.snapshot.queryParamMap.get("redirectUrl");
      
      this.router.navigate(["/"]);
      
    },
    (err:any) =>{
     this.isLoading=false;
      if(err.error.error == "Verify"){
          this.router.navigate(["/emailSent"]);
      }
      this.withErrors=true;
      this.error=err.error.error;
    }
    )
  }
}
