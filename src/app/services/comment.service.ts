import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { MYAPIS } from '../components/Api';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  token=localStorage.getItem("justDoitTokAuth");

  constructor(public http:HttpClient) { }

  addComment(comment:any){
     return this.http.post(`${MYAPIS.LIVEAPI}/answerComments/addComment`,comment,{headers:{"Bearer":`${this.token}`}});
  }
  
}
