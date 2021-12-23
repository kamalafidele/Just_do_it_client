import { NotificationService } from './../../services/notification.service';
import { UserProfileComponent } from './../user-profile/user-profile.component';
import { LoginRegisterService } from './../../services/login-register.service';
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces.service';
import { MatDialog } from '@angular/material/dialog';
import { AskQuestionComponent } from '../ask-question/ask-question.component';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../loader.css']
})
export class HomeComponent implements OnInit {

   user:any=JSON.parse(localStorage.getItem("justDoItUser") || '');
   userImg:any=this.user.profile;
   userWorkspaces:any=[];
   checkedWorkspace:any=null;
   noneChecked=true;
   showSettings=false;
   notificationChecked=false;
   notifications:any=[];
   mobileIcons=false;
   defaultDesc="JustDoIt is a social platform where people discuss world matters and interesting topics that you like..";
   defaultImg="https://res.cloudinary.com/justdoit/image/upload/v1637511391/users/images/Just_do_display_image_a4lvcx.png"; 
   mboneraDarkImg="https://res.cloudinary.com/justdoit/image/upload/v1640105206/questionImages/images/Mbonera-dark_ntdvzp.png";
   mboneraLightImg="https://res.cloudinary.com/justdoit/image/upload/v1640105207/questionImages/images/Mbonera-light_ntebvt.png";
   bookingDarkImg="https://res.cloudinary.com/justdoit/image/upload/v1640105206/questionImages/images/Codeam-dark_hrqnkd.png";
   bookingLightImg="https://res.cloudinary.com/justdoit/image/upload/v1640105206/questionImages/images/Booking-light_nzux3f.png";
   //../../../assets/Images/Mbonera-light.png
  @ViewChild("abc") abc:ElementRef;

 constructor(private router:Router,private workspaceSer:WorkspacesService, private meta:Meta,private title:Title,
   public dialog:MatDialog,private loginReg:LoginRegisterService, public notif:NotificationService, public ref:ElementRef) {
     this.abc=ref;
    }

  ngOnInit(): void {
     this.title.setTitle("JDI | Home");
     this.meta.updateTag({name:"description",content:this.defaultDesc});
     this.meta.updateTag({property:"og:image",content:this.defaultImg});

     this.workspaceSer.getUserWorkspaces()
     .subscribe((res:any) =>{
       console.log("GOT RESPONSE",res.userWorkspaces.length);
      if(res.userWorkspaces.length==0 || res.userWorkspaces[0].workspaces.length < 5)
          this.router.navigate(["/workspace"]);
          
       this.userWorkspaces=res.userWorkspaces[0].workspaces;
     })

     this.notif.getAllNotifications()
     .subscribe((res:any) =>{
       this.notifications=res.notifications;
     })

  }
  openQuestionDialog(){
    this.showSettings=false;
      this.dialog.open(AskQuestionComponent,{panelClass:"custom-dialog-container",closeOnNavigation:true});
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

     this.abc.nativeElement.checked=!this.abc.nativeElement.checked;
     this.mobileIcons=!this.mobileIcons;
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
     if(this.checkedWorkspace != null)
       this.checkedWorkspace.isChecked=false;
   }

   openUserProfile(){
     this.showSettings=false;
     this.dialog.open(UserProfileComponent);
   }

   changeNotifyStatus(){
     this.notificationChecked=true;
     this.noneChecked=true;
   }

   toggleMobileIcons(){
     this.mobileIcons=!this.mobileIcons;
   }

   updateUserMode(){

     this.user.darkMode=!this.user.darkMode
     this.notif.updateUserMode(this.user.darkMode)
     .subscribe((res:any) =>{
 
       localStorage.removeItem("justDoItUser");

       localStorage.setItem("justDoItUser",JSON.stringify(this.user));
     },
     (err:any) =>{
        console.log("MODE ERROR: ",err);
     }
     ) 

   }
}