import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import { AddAnswerComponent } from '../add-answer/add-answer.component';
import { AnswersService } from 'src/app/services/answers.service';
import { CookieService } from 'ngx-cookie-service';
import { LikeDislike } from 'src/app/likeDislike';


@Component({
  selector: 'specific-topic',
  templateUrl: './specific-topic.component.html',
  styleUrls: ['./specific-topic.component.css','../loader.css']
})
export class SpecificTopicComponent implements OnInit, OnChanges {
  @Input() passedTopic:any;
  @Input() passedUser:any;
  @Input() passedQuestions:any;
   questions:any=[];
   length=1;
   user:any;
   scrollEffect=false;
   allQuestions:any=[];
   notScrolly=true;
   notEmpty=true;
   currentQuestionsNum=0;
   numToReduce=0;
   contentHasInit=false;

  constructor(public dialog:MatDialog,private answerSer:AnswersService,public cookies:CookieService) { }

  ngOnInit(): void {
    this.user=this.passedUser;

    this.allQuestions=this.passedQuestions.filter((q:any) => q.topic._id == this.passedTopic._id);
      this.numToReduce=this.allQuestions.length/7;
      this.currentQuestionsNum=this.allQuestions.length-7;
      this.contentHasInit=true;
      this.length=this.allQuestions.length;
      this.questions=this.allQuestions.slice(0,this.allQuestions.length/this.numToReduce);

    }

  ngOnChanges(changes:SimpleChanges){

    this.passedTopic=changes.passedTopic.currentValue;
    this.questions=this.passedQuestions.filter((q:any) => q.topic._id == this.passedTopic._id);
    this.length=this.questions.length;
    this.contentHasInit=true;
  }

  openAnsweringDialog(question:any){
     this.dialog.open(AddAnswerComponent,{data:{question}});
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
    if(this.notScrolly && this.notEmpty && this.contentHasInit){
      this.scrollEffect=true;
      this.notScrolly=false;
      setTimeout(() =>{
        this.loadNextQuestions()
      },1000);

    }

    
  }

  loadNextQuestions(){
    let lastIndex=this.questions.length;

    if(this.currentQuestionsNum >0 && this.currentQuestionsNum <7){
    
      this.allQuestions.slice(lastIndex,lastIndex+this.currentQuestionsNum).forEach((q:any) =>{
        this.questions.push(q);
      })

      this.notScrolly=false;
      this.scrollEffect=false;
      this.currentQuestionsNum-=7;
    }
    else if(this.currentQuestionsNum > 7){
       this.numToReduce=this.currentQuestionsNum/7;
      
      this.allQuestions.slice(lastIndex,(this.currentQuestionsNum/this.numToReduce)+lastIndex).forEach((q:any) =>{
        this.questions.push(q);
      })
      
      this.scrollEffect=false;
      this.notScrolly=true;
       this.currentQuestionsNum-=7;
    }
    else if(this.currentQuestionsNum <=0 ){
      this.scrollEffect=false;
      this.notEmpty=false;
    }

  }

}
