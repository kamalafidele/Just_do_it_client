import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MYAPIS } from '../components/Api';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  token=localStorage.getItem("justDoitTokAuth")
  constructor(private http:HttpClient) { }

  addQuestion(data:any){
    return this.http.post(`${MYAPIS.LIVEAPI}/questions/addQuestion`,data,{headers:{"Bearer":`${this.token}`}});
  }

  getAllQuestions(){
    return this.http.get(`${MYAPIS.LIVEAPI}/questions/allQuestions`,{headers:{"Bearer":`${this.token}`}});
  }

  getTopicRelatedQuestions(id:any){
    return this.http.get(`${MYAPIS.LIVEAPI}/questions/topicQuestions/${id}`,{headers:{"Bearer":`${this.token}`}});
  }

  getQuestionAndAnswers(id:any){
    return this.http.get(`${MYAPIS.LIVEAPI}/users/question/${id}`);
  }
  getQuestionRelatedQuestions(id:any){
    return this.http.get(`${MYAPIS.LIVEAPI}/users/questionRelatedQuestions/${id}`);
  }
}
