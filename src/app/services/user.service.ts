import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token=localStorage.getItem("justDoitTokAuth");

  constructor(private http:HttpClient) { }

  uploadProfilePicture(data:any){
    return this.http.post("https://justdoitrw.herokuapp.com/api/justdoit/userFiles/profilePicture",data,{headers:{"Bearer":`${this.token}`}});
  }
}
