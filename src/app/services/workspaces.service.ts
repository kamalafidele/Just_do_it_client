import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MYAPIS } from '../components/Api';

@Injectable({
  providedIn: 'root'
})
export class WorkspacesService {
  token=localStorage.getItem("justDoitTokAuth")
  constructor(private http:HttpClient) { }

  getAllWorkspaces(){
    

    return this.http.get(`${MYAPIS.LIVEAPI}/workspaces/allWorkspaces`,{headers:{"Bearer":`${this.token}`}});
  }

  addUserWorkspaces(data:any){
    return this.http.post(`${MYAPIS.LIVEAPI}/workspaces/addUser_workspaces`,data,{headers:{"Bearer":`${this.token}`}});
  }

  getUserWorkspaces(){
    return this.http.get(`${MYAPIS.LIVEAPI}/workspaces/userWorkspaces`,{headers:{"Bearer":`${this.token}`}});
  }
}
