import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';
import {MatDialog} from "@angular/material/dialog";
import { AddAnswerComponent } from '../add-answer/add-answer.component';

@Component({
  selector: 'specific-topic',
  templateUrl: './specific-topic.component.html',
  styleUrls: ['./specific-topic.component.css']
})
export class SpecificTopicComponent implements OnInit, OnChanges {
  @Input() passedTopic:any;
   questions:any=[];

  constructor(private questionService:QuestionsService,public dialog:MatDialog) { }

  ngOnInit(): void {
     this.questionService.getTopicRelatedQuestions(this.passedTopic._id)
     .subscribe((res:any) =>{
       console.log(res.topicQuestions);
       this.questions=res.topicQuestions;
     })
    }

  ngOnChanges(changes:SimpleChanges){
    this.passedTopic=changes.passedTopic.currentValue;
    this.questionService.getTopicRelatedQuestions(this.passedTopic._id)
    .subscribe((res:any) =>{
      this.questions=res.topicQuestions;
    })
  }

  openAnsweringDialog(question:any){
     this.dialog.open(AddAnswerComponent,{data:{question}});
  }

}
