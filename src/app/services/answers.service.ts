import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AnswersService {
  
  token=localStorage.getItem("justDoitTokAuth")
  constructor(private http:HttpClient) { }

  addAnswer(data:any){
    return this.http.post("http://localhost:4500/api/justdoit/answers/addAnswer",data,{headers:{"Bearer":`${this.token}`}});
  }
}
