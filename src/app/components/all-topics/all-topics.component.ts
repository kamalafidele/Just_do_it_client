import { Component, OnInit, Input } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import {MatDialog} from "@angular/material/dialog";
import { AddAnswerComponent } from '../add-answer/add-answer.component';
import { AnswersService } from 'src/app/services/answers.service';
import { CookieService } from 'ngx-cookie-service';
import { LikeDislike } from 'src/app/likeDislike';

@Component({
  selector: 'all-topics',
  templateUrl: './all-topics.component.html',
  styleUrls: ['./all-topics.component.css','../loader.css']
})
export class AllTopicsComponent implements OnInit {
  @Input() passedTopic:any;
  @Input() passedUser:any;
   questions:any=[];
   length=1;
   isLoading=false;
   isUpVote=false;
   isDownVote=false;
   user:any;

  constructor(private questionService:QuestionsService,public dialog:MatDialog,private answerSer:AnswersService,public cookies:CookieService) {
    
   }

  ngOnInit(): void {
    
    this.user=this.passedUser;

    this.isLoading=true;
     this.questionService.getAllQuestions()
     .subscribe((res:any) =>{
       this.isLoading=false;
       this.questions=res.questions;
       this.length=res.questions.length;
     })
    }

  openAnsweringDialog(question:any){
     this.dialog.open(AddAnswerComponent,{data:{question},panelClass:"custom-dialog-container"});
  }
  // removeQuestion(id:any){
  //   this.questions=this.questions.filter((q:any) => q._id != id)
  // }

  upvote(id:any){
    let like=new LikeDislike(this.answerSer,this.cookies,this.questions);
    like.upvote(id);
  }

  downvote(id:any){
    let dislike=new LikeDislike(this.answerSer,this.cookies,this.questions);
    dislike.downvote(id);
  }

}
