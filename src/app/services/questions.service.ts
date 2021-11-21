import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  token=localStorage.getItem("justDoitTokAuth")
  constructor(private http:HttpClient) { }

  addQuestion(data:any){
    return this.http.post("https://justdoitrw.herokuapp.com/api/justdoit/questions/addQuestion",data,{headers:{"Bearer":`${this.token}`}});
  }

  getAllQuestions(){
    return this.http.get("https://justdoitrw.herokuapp.com/api/justdoit/questions/allQuestions",{headers:{"Bearer":`${this.token}`}});
  }

  getTopicRelatedQuestions(id:any){
    return this.http.get(`https://justdoitrw.herokuapp.com/api/justdoit/questions/topicQuestions/${id}`,{headers:{"Bearer":`${this.token}`}});
  }
}
