import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  
  token=localStorage.getItem("justDoitTokAuth")
  constructor(private http:HttpClient) { }

  addAnswer(data:any){
    return this.http.post("https://justdoitrw.herokuapp.com/api/justdoit/answers/addAnswer",data,{headers:{"Bearer":`${this.token}`}});
  }

  upVote(data:any){
    return this.http.post("https://justdoitrw.herokuapp.com/api/justdoit/answers/upVoteAnswer",data,{headers:{"Bearer":`${this.token}`}})
  }

  downVote(data:any){
    return this.http.post("https://justdoitrw.herokuapp.com/api/justdoit/answers/downVoteAnswer",data,{headers:{"Bearer":`${this.token}`}})
  }
}
