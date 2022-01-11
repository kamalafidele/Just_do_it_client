import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
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
   questions:any=[];
   isLoading=false;
   length=1;
   user:any;
   scrollEffect=false;
   allQuestions:any=[];
   notScrolly=true;
   notEmpty=true;
   currentQuestionsNum=0;
   numToReduce=0;

  constructor(private questionService:QuestionsService,public dialog:MatDialog,private answerSer:AnswersService,public cookies:CookieService) { }

  ngOnInit(): void {
    this.user=this.passedUser;
    this.isLoading=true;
     this.questionService.getTopicRelatedQuestions(this.passedTopic._id)
     .subscribe((res:any) =>{
      this.isLoading=false;
      this.allQuestions=res.topicQuestions;
      this.numToReduce=res.topicQuestions.length/4;
      this.currentQuestionsNum=res.topicQuestions.length-4;
     
     
      this.questions=res.topicQuestions.slice(0,res.topicQuestions.length/this.numToReduce);
       this.length=res.topicQuestions.length;
     })
    }

  ngOnChanges(changes:SimpleChanges){
    this.length=1;
    this.isLoading=true;
    this.passedTopic=changes.passedTopic.currentValue;
    this.questionService.getTopicRelatedQuestions(this.passedTopic._id)
    .subscribe((res:any) =>{
      this.isLoading=false;
      this.questions=res.topicQuestions;
      this.length=res.topicQuestions.length;
    })
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

    if(this.currentQuestionsNum >0 && this.currentQuestionsNum <4){
    
      this.allQuestions.slice(lastIndex,lastIndex+this.currentQuestionsNum).forEach((q:any) =>{
        this.questions.push(q);
      })

      this.notScrolly=false;
      this.scrollEffect=false;
      this.currentQuestionsNum-=4;
    }
    else if(this.currentQuestionsNum > 4){
       this.numToReduce=this.currentQuestionsNum/4;
      
      this.allQuestions.slice(lastIndex,(this.currentQuestionsNum/this.numToReduce)+lastIndex).forEach((q:any) =>{
        this.questions.push(q);
      })
      
      this.scrollEffect=false;
      this.notScrolly=true;
       this.currentQuestionsNum-=4;
    }
    else if(this.currentQuestionsNum <=0 ){
      this.scrollEffect=false;
      this.notEmpty=false;
    }

  }

}
