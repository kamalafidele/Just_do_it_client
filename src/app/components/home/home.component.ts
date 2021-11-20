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

 constructor(private router:Router,private workspaceSer:WorkspacesService, public dialog:MatDialog) { }

  ngOnInit(): void {
     this.workspaceSer.getUserWorkspaces()
     .subscribe((res:any) =>{
       
      if(res.userWorkspaces[0].workspaces.length < 5)
          this.router.navigate(["/workspace"]);
          
       this.userWorkspaces=res.userWorkspaces[0].workspaces;
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
  
   }
}
