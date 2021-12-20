import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import {MatDialog} from "@angular/material/dialog";
import { AddAnswerComponent } from '../add-answer/add-answer.component';
import { AnswersService } from 'src/app/services/answers.service';

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

  constructor(private questionService:QuestionsService,public dialog:MatDialog,private answerSer:AnswersService) { }

  ngOnInit(): void {
    this.user=this.passedUser;
    this.isLoading=true;
     this.questionService.getTopicRelatedQuestions(this.passedTopic._id)
     .subscribe((res:any) =>{
      this.isLoading=false;
       this.questions=res.topicQuestions;
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
    this.fowardVote(id,"upvote");
    let data={answerId:id};
    this.answerSer.upVote(data)
    .subscribe((res:any) =>{
    },
    (err:any) => {this.reverseVote(id,"upvote")}
    )
  }

  downvote(id:any){
    this.fowardVote(id,"downvote");
     let data={answerId:id};
     this.answerSer.downVote(data)
     .subscribe((res:any) =>{
     },
     (err:any) =>{this.reverseVote(id,"downvote");}
     )
  }

  fowardVote(id:any,action:any){
    this.questions.forEach((q:any) => {
      if(q.answertoshow._id==id && action=="upvote") q.answertoshow.upVotes++;
      else if(q.answertoshow._id==id && action=="downvote") q.answertoshow.downVotes++;});
  }

  reverseVote(id:any,action:any){
    this.questions.forEach((q:any) => {
      if(q.answertoshow._id==id && action=="upvote") q.answertoshow.upVotes--;
      else if(q.answertoshow._id==id && action=="downvote")  q.answertoshow.downVotes--;});
  }

}
