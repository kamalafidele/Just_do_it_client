import { Component, OnInit, ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css','../home/home.component.css','../loader.css']
})
export class ViewQuestionComponent implements OnInit, AfterViewInit {
  mobileIcons=false;
  question:any=[];
  answers:any=[];
  length=0;
  length2=0;
  isLoading=false;
  isLoading2=true;

  relatedQuestions:any=[];
  questions:any=[];
  token=localStorage.getItem("justDoitTokAuth") || '';  
  id:any="";

  user:any=JSON.parse(localStorage.getItem("justDoItUser") || 'null' );

  @ViewChild("abc") abc:ElementRef;
  constructor(public ref:ElementRef, public routes:ActivatedRoute, public qService:QuestionsService, public title:Title,public meta:Meta) {
    this.abc=ref;
   }

  ngOnInit(): void {
     this.routes.paramMap
     .subscribe((params:any) =>{
       this.id=params.get("questionId");
     })

     this.isLoading=true;
     this.qService.getQuestionAndAnswers(this.id)
     .subscribe((res:any) =>{
      this.isLoading=false;
       this.answers=res.answers;
       this.length=1;
       this.question=res.question;
       this.length2=res.answers.length;

       this.title.setTitle(res.question.question);
       this.meta.updateTag({name:"description",content:res.question.question});

       if(res.answers.length > 0)
         this.meta.updateTag({property:"og:description",content:res.answers[0].answer});

       if(res.answers.length > 0 && res.answers[0].images.length > 0 )
          this.meta.updateTag({property:"og:image",content:res.answers[0].images[0]})
         
     },
     (err:any) =>{
      this.isLoading=false;
     }
     )
  }

  ngAfterViewInit(): void {
     
     setTimeout(() =>{
      this.qService.getQuestionRelatedQuestions(this.question.topic._id)
      .subscribe((res:any) =>{
        this.isLoading2=false;
        this.questions=res.topicQuestions.filter((q:any) => q._id != this.question._id);
      })
     },3000);

     
  }
  
  toggleMobileIcons(){
    this.mobileIcons=!this.mobileIcons;
  }

  
}
