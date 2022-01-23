import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/services/login-register.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {
  
  verificationCode:string="";
  constructor(private activatedRoute:ActivatedRoute,private service:LoginRegisterService,private router:Router) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap
    .subscribe((params:any) =>{
        this.verificationCode= params.get("id") ;
     
    });
    
    let data={verificationCode:this.verificationCode};
    this.service.verifyEmail(data)
    .subscribe((res:any) =>{
        localStorage.setItem("justDoitTokAuth",res.token);
        localStorage.setItem("justDoItUser",JSON.stringify(res.user));
        
        this.router.navigate(["/workspace"]);
    },
    (err:any) =>{
      console.log(err.error);

      if(err.error.error == "Verified"){
        this.router.navigate(["/account"]);
      }else{
        this.router.navigate(["/emailSent"]);
      }
    }
    )
  }

}
