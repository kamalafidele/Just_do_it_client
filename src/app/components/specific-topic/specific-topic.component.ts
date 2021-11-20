import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { QuestionsService } from 'src/app/services/questions.service';

@Component({
  selector: 'specific-topic',
  templateUrl: './specific-topic.component.html',
  styleUrls: ['./specific-topic.component.css']
})
export class SpecificTopicComponent implements OnInit, OnChanges {
  @Input() passedTopic:any;
   questions:any=[];

  constructor(private questionService:QuestionsService) { }

  ngOnInit(): void {
     this.questionService.getTopicRelatedQuestions(this.passedTopic._id)
     .subscribe((res:any) =>{
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

}
