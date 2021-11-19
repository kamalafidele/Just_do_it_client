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

  constructor(private workspaceService:WorkspacesService) { }

  ngOnInit(): void {
      this.workspaceService.getAllWorkspaces()
      .subscribe((res:any) =>{
      this.workspaces=res.workspaces;
      
      },
      (err:any) =>{
        console.log("Error: ",err); 
      }
      )
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
    this.workspaceService.addUserWorkspaces(this.selectedWorkspaces) 
    .subscribe((res:any) =>{
      console.log("Res: ",res);
    },
    (err:any) =>{
      console.log("Error: ",err);
    }
    )
  }
}
