import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MYAPIS } from '../components/Api';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token=localStorage.getItem("justDoitTokAuth");

  constructor(private http:HttpClient) { }

  uploadProfilePicture(data:any){
    return this.http.post(`${MYAPIS.LIVEAPI}/userFiles/profilePicture`,data,{headers:{"Bearer":`${this.token}`}});
  }
}
