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
   scrollEffect=false;
   allQuestions:any=[];
   notScrolly=true;
   notEmpty=true;
   currentQuestionsNum=0;
   numToReduce=0;

  constructor(private questionService:QuestionsService,public dialog:MatDialog,private answerSer:AnswersService,public cookies:CookieService) {
    
   }

  ngOnInit(): void {
    
    this.user=this.passedUser;

    this.isLoading=true;
     this.questionService.getAllQuestions()
     .subscribe((res:any) =>{
       this.isLoading=false;
       this.allQuestions=res.questions;
        this.numToReduce=res.questions.length/10;
       this.currentQuestionsNum=res.questions.length-10;
       
       
       this.questions=res.questions.slice(0,res.questions.length/this.numToReduce);
       this.length=res.questions.length;
     },
     (err) =>{
       this.notEmpty=false;
       this.scrollEffect=false
     }
     )
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

  onScroll(){
    if(this.notScrolly && this.notEmpty){
      this.scrollEffect=true;
      this.notScrolly=false;
      setTimeout(() =>{
        this.loadNextQuestions()
      },1000);

    }

    
  }

  loadNextQuestions(){
    let lastIndex=this.questions.length;

    if(this.currentQuestionsNum >0 && this.currentQuestionsNum <10){
    
      this.allQuestions.slice(lastIndex,lastIndex+this.currentQuestionsNum).forEach((q:any) =>{
        this.questions.push(q);
      })

      this.notScrolly=false;
      this.scrollEffect=false;
      this.currentQuestionsNum-=10;
    }
    else if(this.currentQuestionsNum >= 10){
       this.numToReduce=this.currentQuestionsNum/10;
      
      this.allQuestions.slice(lastIndex,(this.currentQuestionsNum/this.numToReduce)+lastIndex).forEach((q:any) =>{
        this.questions.push(q);
      })
      
      this.scrollEffect=false;
      this.notScrolly=true;
       this.currentQuestionsNum-=10;
    }

  }

}
