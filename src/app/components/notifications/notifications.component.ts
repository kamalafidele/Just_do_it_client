import { NotificationService } from './../../services/notification.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fadeAnimation, slideAnimation, topSlideAnimation } from '../animations';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  animations:[
    fadeAnimation,
    slideAnimation,
    topSlideAnimation
  ]
})
export class NotificationsComponent implements OnInit {
  @Input() passedUser:any;
  @Output() notificationChange=new EventEmitter();
  notifications:any=[];
  isLoading=false;
  length=1;
  user:any;

  constructor(public notificationsServ:NotificationService) { }

  ngOnInit(): void {
    this.user=this.passedUser
    
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
    this.length=this.notifications.length;
    this.notificationsServ.deleteNotication(id)
    .subscribe(
      (res:any) =>{
        this.notificationChange.emit(this.notifications);
      },
     (err:any) =>{
       
       this.notifications=tempNotificatinos;
    }
    )
  }
}
