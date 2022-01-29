import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AngularEditorConfig} from "@kolkov/angular-editor"
import { QuestionsService } from 'src/app/services/questions.service';
import { WorkspacesService } from 'src/app/services/workspaces.service';
import { AngularEditorConfigData } from '../AngularEditorConfigData';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class AskQuestionComponent implements OnInit {
  htmlContent = '';
  //images=document.getElementsByTagName("img");
  fonts=document.getElementsByTagName("font");
  enteredQuestion="";
  error="";
  errorExists=false;
  workspaces:any=[];
  selectedWorkspace="";
  topicError=false;
  isLoading=false;
  dialogRef=this.dialog;
  config: AngularEditorConfig = AngularEditorConfigData;
  allQuestions:any;

  constructor(public questionServ:QuestionsService,public workspaceServ:WorkspacesService, public dialog:MatDialog) { 
    this.allQuestions=JSON.parse(localStorage.getItem("allQuestions") || "[]");
  } 

  ngOnInit(): void {
    this.workspaceServ.getUserWorkspaces()
    .subscribe((res:any) =>{
       this.workspaces=res.userWorkspaces[0].workspaces;
    })

  }



  askQuestion(){
     
    for(let j=0; j<this.fonts.length; j++){
       this.enteredQuestion+=this.fonts[j].innerText+" ";
    }

    if(this.selectedWorkspace==""){
       this.topicError=true;
       this.enteredQuestion="";
    }
    else if(this.enteredQuestion == "" ){
          this.error="Type your question please.";
          this.errorExists=true;
    }
    else {

      this.isLoading=true;
      let data={topic:this.selectedWorkspace,question:this.enteredQuestion};

      this.questionServ.addQuestion(data)
      .subscribe((res:any) =>{
        this.isLoading=false;
        
        this.allQuestions.unshift(res.addedQuestion);
        localStorage.setItem("allQuestions",JSON.stringify(this.allQuestions));
        window.location.reload();
      },
      (err:any) =>{
        //this.isLoading=false;
        console.log("Error: ",err);
      }
      )

    this.enteredQuestion="";
    this.topicError=false;
    this.error="";
    }
    
  }

  closeDialog(){
    this.dialogRef.closeAll();
  }

}
