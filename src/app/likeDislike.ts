import { CookieService } from "ngx-cookie-service";
import { AnswersService } from "./services/answers.service";

export class LikeDislike{
    questions:any=[];
    constructor(private answerSer:AnswersService,private cookies:CookieService,private q:any){
        this.questions=q;
    }

     upvote(id:any){

        if(!this.cookies.get(id)){
          this.cookies.set(id,"upvote");
          this.fowardVote(id,"upvote");
    
          let data={answerId:id,isReduce:false};
          this.answerSer.upVote(data)
          .subscribe((res:any) =>{
          },
          (err:any) => {this.reverseVote(id,"upvote")}
          )
    
        }
        else if(this.cookies.get(id) && this.cookies.get(id)=="downvote"){
            this.cookies.delete(id);
            this.cookies.set(id,"upvote");
    
            this.reverseVote(id,"downvote");
            this.fowardVote(id,"upvote");
            
            let data1={answerId:id,isReduce:false};
            let data2={answerId:id,isReduce:true};
    
            this.answerSer.downVote(data2)
            .subscribe((res:any) =>{
              this.answerSer.upVote(data1)
              .subscribe((res:any) =>{})
            })
        }
    
      }
    
      downvote(id:any){
    
        if(!this.cookies.get(id)){
          this.cookies.set(id,"downvote");
          this.fowardVote(id,"downvote");
    
          let data={answerId:id,isReduce:false};
          this.answerSer.downVote(data)
          .subscribe((res:any) =>{
          },
          (err:any) =>{this.reverseVote(id,"downvote");}
          )
    
        }
        else if(this.cookies.get(id) && this.cookies.get(id) == "upvote"){
           this.cookies.delete(id);
           this.cookies.set(id,"downvote");
    
           this.reverseVote(id,"upvote");
           this.fowardVote(id,"downvote");
    
           let data1={answerId:id,isReduce:true};
           let data2={answerId:id,isReduce:false};
           this.answerSer.upVote(data1)
           .subscribe((res:any) =>{
             this.answerSer.downVote(data2)
             .subscribe((res:any) =>{})
           })
    
        }
      }
    
      fowardVote(id:any,action:any){
        this.questions.forEach((q:any) => {
          if( (q.answertoshow && q.answertoshow._id==id) && action=="upvote") q.answertoshow.upVotes++;
          else if((q.answertoshow && q.answertoshow._id==id) && action=="downvote") q.answertoshow.downVotes++;});
      }
    
      reverseVote(id:any,action:any){
        this.questions.forEach((q:any) => {
          if((q.answertoshow && q.answertoshow._id==id) && action=="upvote") q.answertoshow.upVotes--;
          else if((q.answertoshow && q.answertoshow._id==id) && action=="downvote")  q.answertoshow.downVotes--;});
          
      }
}