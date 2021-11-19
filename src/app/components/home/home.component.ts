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

  constructor(private router:Router,private workspaceSer:WorkspacesService, public dialog:MatDialog) { }

  ngOnInit(): void {
     this.workspaceSer.getUserWorkspaces()
     .subscribe((res:any) =>{
       this.userWorkspaces=res.userWorkspaces[0].workspaces;
     })

     if(this.userWorkspaces.length > 5)
        this.router.navigate(["/workspace"]);
  }
  openQuestionDialog(){
      this.dialog.open(AskQuestionComponent);
  }
}
