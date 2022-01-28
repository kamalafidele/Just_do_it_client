import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
   @Input() passedComments:any;
   @Input() passedUser:any;
  constructor() { }

  ngOnInit(): void {
    //console.log(this.passedComments);
  }

}
