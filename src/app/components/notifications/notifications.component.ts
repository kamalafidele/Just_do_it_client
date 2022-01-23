import { NotificationService } from './../../services/notification.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { fadeAnimation, slideAnimation, topSlideAnimation } from '../animations';

@Component({
  selector: 'notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css','../loader.css'],
  animations:[
    fadeAnimation,
    slideAnimation,
    topSlideAnimation
  ]
})
export class NotificationsComponent implements OnInit {
  @Input() passedUser:any;
  @Output() notificationChange=new EventEmitter();
  @Input() passedNotifications:any;
  notifications:any=[];
  length=1;
  user:any;

  constructor(public notificationsServ:NotificationService) { }

  ngOnInit(): void {
    this.user=this.passedUser
    this.notifications=this.passedNotifications;
    this.length=this.passedNotifications.length;
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
