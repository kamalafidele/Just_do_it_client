import { NotificationService } from './../../services/notification.service';
import { UserProfileComponent } from './../user-profile/user-profile.component';
import { LoginRegisterService } from './../../services/login-register.service';
import { Component, OnInit, ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspacesService } from 'src/app/services/workspaces.service';
import { MatDialog } from '@angular/material/dialog';
import { AskQuestionComponent } from '../ask-question/ask-question.component';
import { Meta, Title } from '@angular/platform-browser';
import { QuestionsService } from 'src/app/services/questions.service';
import { liveSearch } from 'src/app/liveSearch';
import { fadeAnimation, slideAnimation, topSlideAnimation } from '../animations';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../loader.css','./home-assistant.css'],
  animations:[
    fadeAnimation,
    topSlideAnimation,
    slideAnimation
  ]
})
export class HomeComponent implements OnInit, AfterViewInit {
   
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
   itemsForSearching:any=[];
   searchInput:any;
   isSearching=false;
   lostSearchParas=0;
   adds:any=[];
   addLoading=true;
   addLoader="https://res.cloudinary.com/justdoit/image/upload/v1641234634/questionImages/images/Adds-loader_r7tlln.svg";
   workspaceStatus=false;
   showThemeModeButton=false;
   questionsToPassToSpecific:any=[];
  @ViewChild("abc") abc:ElementRef;

 constructor(private router:Router,private workspaceSer:WorkspacesService, private meta:Meta,private title:Title,
   public dialog:MatDialog,private loginReg:LoginRegisterService, public notif:NotificationService, public ref:ElementRef,
   public questionService:QuestionsService) {
     this.abc=ref;
    }

  ngOnInit(): void {
     this.title.setTitle("JDI | Home");
     this.meta.updateTag({name:"description",content:this.defaultDesc});
     this.meta.updateTag({property:"og:image",content:this.defaultImg});

     this.workspaceSer.getUserWorkspaces()
     .subscribe((res:any) =>{
      
      if(res.userWorkspaces.length==0 || res.userWorkspaces[0].workspaces.length < 5)
          this.router.navigate(["/workspace"]);
          
       this.userWorkspaces=res.userWorkspaces[0].workspaces;
     })

     this.notif.getAllNotifications()
     .subscribe((res:any) =>{
       this.notifications=res.notifications;
     })

  }

  ngAfterViewInit(): void {
      this.questionService.getAllQuestions()
      .subscribe((res:any) =>{
          this.itemsForSearching=res.questions;
    
      })

      setTimeout(() =>{
        this.notif.getAllAdds()
        .subscribe((res:any) =>{
          this.addLoading=false;
          this.adds=res.adds.filter((add:any) => add.name !=="Codeama");
        },
        (err:any) =>{this.addLoading=false;}
        )
      },5000);

      setTimeout(() =>{
        this.showThemeModeButton=true;
      },2000);
  }
  openQuestionDialog(){
    this.showSettings=false;
      this.dialog.open(AskQuestionComponent,{panelClass:"custom-dialog-container",closeOnNavigation:true});
  }

  trackWorkspace(workspace:any,index:number){
    return workspace ? index : undefined;
}

  toggleCheck(workspace:any){
   window.scrollTo(0,0)
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
     window.scrollTo(0,0);
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

   search(){
     this.isSearching=true;
    this.lostSearchParas=liveSearch(this.searchInput);
    
   }

   abort(){
     this.isSearching=false
     this.searchInput=""
   }

   onNotificationChange(newNotifications:any){
     this.notifications=newNotifications;
   }

   updateClicks(addId:any){
      
      this.adds.forEach((add:any) =>{
        if(add._id == addId){
           add.clicks++;
        }
      })
     let add=this.adds.filter((ad:any) => ad._id == addId);
     let data={addId:add[0]._id,newClicks:add[0].clicks};
   
      this.notif.updateAddClicks(data)
      .subscribe((res:any) =>{
         
      })

   }

   getQuestionsFromAllTopics(questions:any){
     this.questionsToPassToSpecific=questions;
   }
}