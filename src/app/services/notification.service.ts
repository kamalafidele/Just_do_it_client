import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MYAPIS } from '../components/Api';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  token=localStorage.getItem("justDoitTokAuth");

  constructor(public http:HttpClient) { }

  getAllNotifications(){
    return this.http.get(`${MYAPIS.LIVEAPI}/userNotifications/notifications`,{headers:{"Bearer":`${this.token}`}});
  }
  
  deleteNotication(id:any){
    return this.http.delete(`${MYAPIS.LIVEAPI}/userNotifications/${id}`,{headers:{"Bearer":`${this.token}`}});
  }
}
