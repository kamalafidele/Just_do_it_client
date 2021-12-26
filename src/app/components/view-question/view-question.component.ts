import { Component, OnInit, ViewChild,ElementRef, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { QuestionsService } from 'src/app/services/questions.service';
import { Title, Meta } from '@angular/platform-browser';
import { AnswersService } from 'src/app/services/answers.service';
import { CookieService } from 'ngx-cookie-service';
import { LikeDislike } from 'src/app/likeDislike';
import { MatDialog } from '@angular/material/dialog';
import { AddAnswerComponent } from '../add-answer/add-answer.component';
import { liveSearch } from 'src/app/liveSearch';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css','../home/home.component.css','../loader.css','../home/home-assistant.css']
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
  mboneraDarkImg="https://res.cloudinary.com/justdoit/image/upload/v1640105206/questionImages/images/Mbonera-dark_ntdvzp.png";
  mboneraLightImg="https://res.cloudinary.com/justdoit/image/upload/v1640105207/questionImages/images/Mbonera-light_ntebvt.png";
  codeamaDarkImg="https://res.cloudinary.com/justdoit/image/upload/v1640105206/questionImages/images/Booking-dark_rdl3lp.png";
  codeamaLightImg="https://res.cloudinary.com/justdoit/image/upload/v1640105206/questionImages/images/Codeama-light_ayegug.png";
  itemsForSearching:any=[];
  searchInput:any;
  isSearching=false;
  lostSearchParas=0

  @ViewChild("abc") abc:ElementRef;
  constructor(public ref:ElementRef, public routes:ActivatedRoute, public qService:QuestionsService,private answerSer:AnswersService,public cookies:CookieService,
    public title:Title,public meta:Meta,public dialog:MatDialog) {
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
     },2000);

     this.qService.getAllQuestions()
     .subscribe((res:any) =>{
       this.itemsForSearching=res.questions;
     })
     
  }
  
  toggleMobileIcons(){
    this.mobileIcons=!this.mobileIcons;
  }

  upvote(id:any){
    let like=new LikeDislike(this.answerSer,this.cookies,this.questions);
    like.upvote(id);
    
    
  }

  downvote(id:any){
    let dislike=new LikeDislike(this.answerSer,this.cookies,this.questions);
    dislike.downvote(id);
  }

  openAnsweringDialog(question:any){
    this.dialog.open(AddAnswerComponent,{data:{question},panelClass:"custom-dialog-container"});
 }

 search(){
  this.isSearching=true;
  this.lostSearchParas=liveSearch(this.searchInput);
}

abort(){
  this.isSearching=false
  this.searchInput=""
}
  
}
