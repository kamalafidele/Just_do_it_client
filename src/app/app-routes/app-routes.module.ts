import { NgModule } from '@angular/core';
import { AccountComponent } from '../components/account/account.component';
import { HomeComponent } from '../components/home/home.component';
import { WorkspaceComponent } from '../components/workspace/workspace.component';
import { VerifyEmailComponent } from '../components/verify-email/verify-email.component';
import { EmailSentComponent } from '../components/email-sent/email-sent.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { ViewQuestionComponent } from '../components/view-question/view-question.component';


const routes:Routes=[
  {component:HomeComponent,path:"",canActivate:[AuthGuardService]},
  {component:AccountComponent,path:"account"},
  {component:WorkspaceComponent,path:"workspace",canActivate:[AuthGuardService]},
  {component:VerifyEmailComponent,path:"verifyEmail/:id"},
  {component:EmailSentComponent,path:"emailSent"},
  {component:ViewQuestionComponent, path:"questionAnswers/:questionId"}
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports:[RouterModule],
  providers:[
    {provide:JWT_OPTIONS,useValue:JWT_OPTIONS},
    JwtHelperService
  ]
})
export class AppRoutesModule { }
