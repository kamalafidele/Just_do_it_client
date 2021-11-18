import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/services/login-register.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private loginService:LoginRegisterService,private router:Router) { }

  ngOnInit(): void {
    let user=localStorage.getItem("justDoItUser");

    if(this.loginService.isLoggedIn() && user){
      this.router.navigate(["/workspace"]);
    }
  }

}
