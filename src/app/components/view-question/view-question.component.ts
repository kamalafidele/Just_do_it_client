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
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-view-question',
  templateUrl: './view-question.component.html',
  styleUrls: ['./view-question.component.css','../home/home.component.css','../loader.css','../home/home-assistant.css']
})
export class ViewQuestionComponent implements OnInit, AfterViewInit {
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
  itemsForSearching:any=[];
  searchInput:any;
  isSearching=false;
  lostSearchParas=0
  @ViewChild("abc") abc:ElementRef;
  adds:any=[];
  addLoading=true;
  addLoader="https://res.cloudinary.com/justdoit/image/upload/v1641234634/questionImages/images/Adds-loader_r7tlln.svg";

  constructor(public ref:ElementRef, public routes:ActivatedRoute, public qService:QuestionsService,private answerSer:AnswersService,public cookies:CookieService,
    public title:Title,public meta:Meta,public dialog:MatDialog, public notif:NotificationService) {
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
        if(!this.user)
          this.itemsForSearching=res.topicQuestions.filter((q:any) => q._id != this.question._id);
      })
     },1000);

     if(this.user){
      this.qService.getAllQuestions()
      .subscribe((res:any) =>{
        this.itemsForSearching=res.questions;
      })
     }

     //THIS FUNCTION LOADS THEE ADDS AFTER 10 SECONDS WHEN THE PAGE HAS BEEN DISPLAYED
     setTimeout(() =>{
      this.notif.getAllAdds()
      .subscribe((res:any) =>{
        this.addLoading=false
        this.adds=res.adds.filter((add:any) => add.name !=="Booking")
      })
     },10000);
     
  }
  
  upvote(id:any){
    let like=new LikeDislike(this.answerSer,this.cookies,this.questions);
    like.upvote(id);
    

  }

  downvote(id:any){
    let dislike=new LikeDislike(this.answerSer,this.cookies,this.questions);
    dislike.downvote(id);
  }

  specialDownvote(answerId:any){
    
    if(!this.cookies.get(answerId)){
      this.cookies.set(answerId,"downvote");
      this.fowardVote(answerId,"downvote");

      let data={answerId:answerId,isReduce:false};
      this.answerSer.downVote(data)
      .subscribe((res:any) =>{
      },
      (err:any) =>{this.reverseVote(answerId,"downvote");}
      )

    }
    else if(this.cookies.get(answerId) && this.cookies.get(answerId) == "upvote"){
       this.cookies.delete(answerId);
       this.cookies.set(answerId,"downvote");

       this.fowardVote(answerId,"downvote");
       this.reverseVote(answerId,"upvote");

       let data1={answerId:answerId,isReduce:true};
       let data2={answerId:answerId,isReduce:false};

       this.answerSer.downVote(data2)
       .subscribe((res:any) =>{
        this.answerSer.upVote(data1)
        .subscribe((res:any) =>{
        })    
       })
    }

  }
  specialUpvote(answerId:any){

    if(!this.cookies.get(answerId)){
      this.cookies.set(answerId,"upvote");
      this.fowardVote(answerId,"upvote");

      let data={answerId:answerId,isReduce:false};
      this.answerSer.upVote(data)
      .subscribe((res:any) =>{
      },
      (err:any) => {this.reverseVote(answerId,"upvote")}
      )

    }
    else if(this.cookies.get(answerId) && this.cookies.get(answerId)=="downvote"){
        this.cookies.delete(answerId);
        this.cookies.set(answerId,"upvote");

        this.reverseVote(answerId,"downvote");
        this.fowardVote(answerId,"upvote");
        
        let data1={answerId:answerId,isReduce:false};
        let data2={answerId:answerId,isReduce:true};

        this.answerSer.downVote(data2)
        .subscribe((res:any) =>{
          this.answerSer.upVote(data1)
          .subscribe((res:any) =>{})
        })
    }
  }

  openAnsweringDialog(question:any){
    this.dialog.open(AddAnswerComponent,{data:{question},panelClass:"custom-dialog-container"});
 }

 //THIS CALLS THE LIVESEARCH FUNCTION FOR MAKING A SEARCH AS YOU TYPE ALGORITH
 search(){
  this.isSearching=true;
  this.lostSearchParas=liveSearch(this.searchInput);
}

//THIS HELPS TO HIDE THE DIV CONTAINING RESULTS
abort(){
  this.isSearching=false
  this.searchInput=""
}

//THIS UPDATES THE CLICKS OF THE ADD
updateClicks(addId:any){
      
  this.adds.forEach((add:any) =>{
    if(add._id == addId){
       add.clicks++;
    }
  })
 let add=this.adds.filter((ad:any) => ad._id == addId);
 let data={addId:add[0]._id,newClicks:add[0].clicks};

  this.notif.updateAddClicks(data)
  .subscribe((res:any) =>{
     console.log(res);
  })

}
 

reverseVote(id:any, action:string){
  this.answers.forEach((answer:any) =>{
    if(answer._id == id && action == "upvote") answer.upVotes--;
    else if(answer._id && action == "downvote") answer.downVotes--;
  })
}

fowardVote(id:any, action:string){
  this.answers.forEach((answer:any) =>{
    if(answer._id == id && action == "upvote") answer.upVotes++;
    else if(answer._id && action == "downvote") answer.downVotes++;
  })
}

}
