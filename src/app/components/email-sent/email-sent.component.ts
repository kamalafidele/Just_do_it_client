import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/services/login-register.service';

@Component({
  selector: 'app-email-sent',
  templateUrl: './email-sent.component.html',
  styleUrls: ['./email-sent.component.css']
})
export class EmailSentComponent implements OnInit {
  imgUrl="assets/Images/Hand.PNG"

  constructor(private loginService:LoginRegisterService,private router:Router) { }

  ngOnInit(): void {
    let user=localStorage.getItem("justDoItUser");

    if(this.loginService.isLoggedIn() && user){
      this.router.navigate(["/workspace"]);
    }
  }

}
