import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import { ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from './components/account/account.component';
import { HomeComponent } from './components/home/home.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginRegisterService } from './services/login-register.service';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { EmailSentComponent } from './components/email-sent/email-sent.component';
import { AppRoutesModule } from './app-routes/app-routes.module';
import { AuthGuardService } from './services/auth-guard.service';
import { WorkspacesService } from './services/workspaces.service';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountComponent,
    HomeComponent,
    WorkspaceComponent,
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    EmailSentComponent,
    AskQuestionComponent
  ],
  entryComponents:[AskQuestionComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutesModule
  ],
  providers: [LoginRegisterService,AuthGuardService,WorkspacesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
