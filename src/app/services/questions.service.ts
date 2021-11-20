import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  token=localStorage.getItem("justDoitTokAuth")
  constructor(private http:HttpClient) { }

  addQuestion(data:any){
    return this.http.post("http://localhost:4500/api/justdoit/questions/addQuestion",data,{headers:{"Bearer":`${this.token}`}});
  }

  getAllQuestions(){
    return this.http.get("http://localhost:4500/api/justdoit/questions/allQuestions",{headers:{"Bearer":`${this.token}`}});
  }

  getTopicRelatedQuestions(id:any){
    return this.http.get(`http://localhost:4500/api/justdoit/questions/topicQuestions/${id}`,{headers:{"Bearer":`${this.token}`}});
  }
}
