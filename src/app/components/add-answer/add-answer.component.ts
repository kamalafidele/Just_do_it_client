import { Component, OnInit, ViewEncapsulation,Inject } from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor"
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AnswersService } from 'src/app/services/answers.service';
import { AngularEditorConfigData } from '../AngularEditorConfigData';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class AddAnswerComponent implements OnInit {
  htmlContent ="";
  images=document.getElementsByTagName("img");
  fonts=document.getElementsByTagName("font");
  paras=document.getElementsByTagName("p");
  insertedImages:any=[];
  enteredAnswer=""; 
  dialogRef=this.dialog;
  error="";
  imageError="";
  isImageError=false;
  errorExists=false;
  passedQuestion:any;
  isLoading=false;

  config: AngularEditorConfig = AngularEditorConfigData;

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,public answerServ:AnswersService,public dialog:MatDialog) {
    this.passedQuestion=data;
 
   } 

  ngOnInit(): void {

  }

  editorChange(){
    for(let i=0; i<this.images.length; i++){
      if(!this.images[i].alt){
       this.images[i].style.width="90%";
       this.images[i].style.borderRadius="5px";

      }
     }
  }

  giveAnswer(){
     
    for(let i=0; i<this.images.length; i++){
     if(!this.images[i].alt){
      this.insertedImages.push(this.images[i].src)
     }
    }

    for(let j=0; j<this.fonts.length; j++){
       this.enteredAnswer+=this.fonts[j].innerText+" ";
    }

    for(let n=0; n<this.paras.length; n++){
      if(!this.paras[n].className)
        this.enteredAnswer+=this.paras[n].innerText+" ";
    }

     if(this.enteredAnswer == "" ){
          this.error="Enter your answer please.";
          this.errorExists=true;

          this.insertedImages=[];
    }
    else if(this.insertedImages.length >2){
         this.isImageError=true;
    }
    else if(this.insertedImages.length <=2){

      this.isLoading=true;
      let data={question:this.data.question._id,answer:this.enteredAnswer,images:this.insertedImages};
 
      this.answerServ.addAnswer(data)
      .subscribe((res:any) =>{
        this.isLoading=false;

        localStorage.setItem("allQuestions",JSON.stringify(res.newAllQuestions));
        window.location.reload();
      },
      (err:any) =>{
        this.isLoading=false;
        console.log("Error: ",err);
      }
      )

    this.enteredAnswer="";
    this.insertedImages=[];
    this.error="";
    }
    
  }

  closeDialog(){
    this.dialogRef.closeAll();
  }
}
