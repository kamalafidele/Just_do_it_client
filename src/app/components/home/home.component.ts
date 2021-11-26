import { NotificationService } from './../../services/notification.service';
import { UserProfileComponent } from './../user-profile/user-profile.component';
import { LoginRegisterService } from './../../services/login-register.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces.service';
import { MatDialog } from '@angular/material/dialog';
import { AskQuestionComponent } from '../ask-question/ask-question.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

   user:any=JSON.parse(localStorage.getItem("justDoItUser") || '');
   userImg:any=this.user.profile;
   userWorkspaces:any=[];
   checkedWorkspace:any;
   noneChecked=true;
   showSettings=false;
   notificationChecked=false;
  notifications:any=[];
  ad1Image="../../../assets/Images/Chat1.jpg";
  ad2Image="../../../assets/Images/Chat2.jpg";
  ad3Image="../../../assets/Images/Chat3.jpg";
 constructor(private router:Router,private workspaceSer:WorkspacesService,
   public dialog:MatDialog,private loginReg:LoginRegisterService, public notif:NotificationService) { }

  ngOnInit(): void {
     this.workspaceSer.getUserWorkspaces()
     .subscribe((res:any) =>{
       
      if(res.userWorkspaces[0].workspaces.length < 5)
          this.router.navigate(["/workspace"]);
          
       this.userWorkspaces=res.userWorkspaces[0].workspaces;
     })

     this.notif.getAllNotifications()
     .subscribe((res:any) =>{
       console.log(res.notifications)
       this.notifications=res.notifications;
     })

  }
  openQuestionDialog(){
      this.dialog.open(AskQuestionComponent);
  }

  trackWorkspace(workspace:any,index:number){
    return workspace ? index : undefined;
}

  toggleCheck(workspace:any){
    this.noneChecked=false;
    this.userWorkspaces.forEach((wksp:any) =>{
      if(wksp._id==workspace._id){
        wksp.isChecked=true;
        this.checkedWorkspace=wksp;
      }else{
        wksp.isChecked=false;
      }
     } )
     this.showSettings=false;
   }

   toggleSettings(){
     this.showSettings=!this.showSettings;
   }

   logout(){
     if(this.loginReg.logout())
       this.router.navigate(["/account"]);
   }

   hideSettings(){
     this.showSettings=false;
   }
   goHome(){
     this.noneChecked=true;
     this.notificationChecked=false;
     this.checkedWorkspace.isChecked=false;
   }

   openUserProfile(){
     this.dialog.open(UserProfileComponent);
   }

   changeNotifyStatus(){
     this.notificationChecked=true;
     this.noneChecked=true;
   }
}
