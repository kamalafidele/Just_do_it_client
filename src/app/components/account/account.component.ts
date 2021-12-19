import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginRegisterService } from 'src/app/services/login-register.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  defaultDesc="JustDoIt is a social platform where people discuss world matters and interesting topics that you like..";
  defaultImg="https://res.cloudinary.com/justdoit/image/upload/v1637511391/users/images/Just_do_display_image_a4lvcx.png"; 

  constructor(private loginService:LoginRegisterService,private router:Router,private meta:Meta,private title:Title) { }

  ngOnInit(): void {
    let user=localStorage.getItem("justDoItUser");

    if(this.loginService.isLoggedIn() && user){
      this.router.navigate(["/workspace"]);
    }

    this.title.setTitle("JDI | Account");
    this.meta.updateTag({name:"description",content:this.defaultDesc});
    this.meta.updateTag({property:"og:image",content:this.defaultImg});
  }

}
