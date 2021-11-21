import { NotificationService } from './../../services/notification.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  notifications:any=[];
  isLoading=false;
  length=1;

  constructor(public notificationsServ:NotificationService) { }

  ngOnInit(): void {
    this.isLoading=true;
    this.notificationsServ.getAllNotifications()
    .subscribe((res:any) =>{
        this.isLoading=false;
        this.notifications=res.notifications;
        this.length=res.notifications.length;
    },
    (err:any) =>{this.isLoading=false;})
  }

  removeNotification(id:any){
    let tempNotificatinos=this.notifications;
    this.notifications=this.notifications.filter((notification:any) => notification._id != id);

    this.notificationsServ.deleteNotication(id)
    .subscribe(
      (res:any) =>{},
     (err:any) =>{
       this.notifications=tempNotificatinos;
    }
    )
  }
}
