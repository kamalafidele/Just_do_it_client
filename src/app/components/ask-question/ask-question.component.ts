import { AfterViewInit, Component, OnInit, ViewEncapsulation } from '@angular/core';
import {AngularEditorConfig} from "@kolkov/angular-editor"
import { QuestionsService } from 'src/app/services/questions.service';
import { WorkspacesService } from 'src/app/services/workspaces.service';

@Component({
  selector: 'app-ask-question',
  templateUrl: './ask-question.component.html',
  styleUrls: ['./ask-question.component.css'],
  encapsulation:ViewEncapsulation.Emulated
})
export class AskQuestionComponent implements OnInit {
  htmlContent = '';
  images=document.getElementsByTagName("img");
  fonts=document.getElementsByTagName("font");
  insertedImages:any=[];
  enteredQuestion="";
  error="";
  imageError="";
  isImageError=false;
  errorExists=false;
  workspaces:any=[];
  selectedWorkspace="";
  topicError=false;
  isLoading=false;

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '20rem',
    minHeight: '5rem',
    width:'100%',
    placeholder: 'Enter a question here...',
    translate: 'no',
    enableToolbar: false,
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarPosition: 'bottom',
    toolbarHiddenButtons: [
      ['bold','redo',
      'italic',
      'underline',
      'strikeThrough',
      'subscript',
      'superscript',
      'justifyLeft',
      'justifyCenter',
      'justifyRight',
      'justifyFull',
      'indent',
      'outdent',
      'insertUnorderedList',
      'insertOrderedList',
      'heading',
      'fontName'],  [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
      ],
    customClasses: [
      {
        name: "quote",
        class: "quote",
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: "titleText",
        class: "titleText",
        tag: "h1",
      },
    ]
  };

  constructor(public questionServ:QuestionsService,public workspaceServ:WorkspacesService) { } 

  ngOnInit(): void {
    this.workspaceServ.getUserWorkspaces()
    .subscribe((res:any) =>{
       this.workspaces=res.userWorkspaces[0].workspaces;
    })

  }



  askQuestion(){
     
    for(let i=0; i<this.images.length; i++){
     if(!this.images[i].alt){
      this.insertedImages.push(this.images[i].src)
     }
    }

    for(let j=0; j<this.fonts.length; j++){
       this.enteredQuestion+=this.fonts[j].innerText+" ";
       
    }

    if(this.selectedWorkspace==""){
       this.topicError=true;
       this.insertedImages=[];
       this.enteredQuestion="";
    }
    else if(this.enteredQuestion == "" ){
          this.error="Type your question please.";
          this.errorExists=true;

          this.insertedImages=[];
    }
    else if(this.insertedImages.length >2){
         this.isImageError=true;
    }
    else if(this.insertedImages.length <=2){

      this.isLoading=true;
      let data={topic:this.selectedWorkspace,question:this.enteredQuestion,images:this.insertedImages};
       console.log(data);

      this.questionServ.addQuestion(data)
      .subscribe((res:any) =>{
        this.isLoading=false;
        window.location.reload();
      },
      (err:any) =>{
        this.isLoading=false;
        console.log("Error: ",err);
      }
      )

    this.enteredQuestion="";
    this.insertedImages=[];
    this.topicError=false;
    this.error="";
    }
    
  }


}
