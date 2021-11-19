import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WorkspacesService {
  token=localStorage.getItem("justDoitTokAuth")
  constructor(private http:HttpClient) { }

  getAllWorkspaces(){
    

    return this.http.get("http://localhost:4500/api/justdoit/workspaces/allWorkspaces",{headers:{"Bearer":`${this.token}`}});
  }

  addUserWorkspaces(data:any){
    return this.http.post("http://localhost:4500/api/justdoit/workspaces/addUser_workspaces",data,{headers:{"Bearer":`${this.token}`}});
  }

  getUserWorkspaces(){
    return this.http.get("http://localhost:4500/api/justdoit/workspaces/userWorkspaces",{headers:{"Bearer":`${this.token}`}});
  }
}
