import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { MYAPIS } from '../components/Api';

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  
  token=localStorage.getItem("justDoitTokAuth")
  constructor(private http:HttpClient) { }

  addAnswer(data:any){
    return this.http.post(`${MYAPIS.LIVEAPI}/answers/addAnswer`,data,{headers:{"Bearer":`${this.token}`}});
  }

  upVote(data:any){
    return this.http.post(`${MYAPIS.LIVEAPI}/answers/upVoteAnswer`,data,{headers:{"Bearer":`${this.token}`}})
  }

  downVote(data:any){
    return this.http.post(`${MYAPIS.LIVEAPI}/answers/downVoteAnswer`,data,{headers:{"Bearer":`${this.token}`}})
  }
}
