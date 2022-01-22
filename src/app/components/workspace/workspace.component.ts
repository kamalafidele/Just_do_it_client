import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { WorkspacesService } from 'src/app/services/workspaces.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './workspace.component.html',
  styleUrls: ['./workspace.component.css']
})
export class WorkspaceComponent implements OnInit {
  workspaces:any =[];
  selectedWorkspaces:any=[];
  isChecked=false;
  isLoading=false;

  constructor(private workspaceService:WorkspacesService,private router:Router) { }

  ngOnInit(): void {
      this.workspaceService.getAllWorkspaces()
      .subscribe((res:any) =>{
      this.workspaces=res.workspaces;
      },
      (err:any) =>{
        console.log("Error: ",err); 
      }
      )

      this.workspaceService.getUserWorkspaces()
      .subscribe((res:any) =>{
        if(res.userWorkspaces[0].workspaces.length >= 5)
           this.router.navigate(["/"]);
      })
  }

  trackWorkspace(workspace:any,index:number){
      return workspace ? index : undefined;
  }
  toggleCheck(workspace:any){
   this.workspaces.forEach((wksp:any) =>{
     if(wksp._id==workspace._id){
       wksp.isChecked=!wksp.isChecked;
     }
    } )
    this.selectedWorkspaces=this.workspaces.filter((wkspc:any) => wkspc.isChecked);
  }

  submitWorspaces(){
    this.isLoading=true;
    this.workspaceService.addUserWorkspaces(this.selectedWorkspaces) 
    .subscribe((res:any) =>{
      this.isLoading=false;
      this.router.navigate(["/"]);
    },
    (err:any) =>{
      this.isLoading=false;
      console.log("Error: ",err);
    }
    )
  }
}
