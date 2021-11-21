import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  token=localStorage.getItem("justDoitTokAuth");

  constructor(public http:HttpClient) { }

  getAllNotifications(){
    return this.http.get("https://justdoitrw.herokuapp.com/api/justdoit/userNotifications/notifications",{headers:{"Bearer":`${this.token}`}});
  }
  
  deleteNotication(id:any){
    return this.http.delete(`https://justdoitrw.herokuapp.com/api/justdoit/userNotifications/${id}`,{headers:{"Bearer":`${this.token}`}});
  }
}
