import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/services/login-register.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  constructor(private loginService:LoginRegisterService,private router:Router) { }

  ngOnInit(): void {
    let user=localStorage.getItem("justDoItUser");

    if(this.loginService.isLoggedIn() && user){
      this.router.navigate(["/workspace"]);
    }
  }

}
