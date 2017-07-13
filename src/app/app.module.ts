import { NgModule }      from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { rootRouterConfig } from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {CalendarComponent} from "./angular2-fullcalendar/src/calendar/calendar";

import { AppComponent }  from './app.component';
import { MainComponent } from './component/main/main.component';
import { LoginComponent } from './component/login/login.component';
import { ForgotPassword } from './component/login/forgot.password';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { ComplaintComponent } from './component/complaint/complaint.component';
import { CircularComponent } from './component/circular/circular.component';
import { AddCircular } from './component/circular/add/add';
import { HomeworkComponent } from './component/homework/homework.component';
import { HomeworkAddComponent } from './component/homework/add/add';
import { CurrentHomework } from './component/homework/current/homework';
import { PassedHomework } from './component/homework/passed/homework';
import { GoogleChart } from './customComponent/chart.directive';
import { CustomLoader } from './customComponent/loader.component';
import { AccountComponent } from './component/account/account.component';
import {AppreciationComponent} from './component/appreciation/appreciation.component';
import {ForMeComponent} from './component/appreciation/for-me/forme';
import {ByMeComponent} from './component/appreciation/by-me/byme';
import {AddEmployeeComponent} from './component/addEmployee/addEmployee.component';
import {AddAppreciation} from './component/appreciation/add/add';
import { PollComponent } from './component/poll/poll.component';
import { AddPollComponent } from './component/poll/add/add';
import { CurrentPollComponent } from './component/poll/current/poll';
import { ClosedPollComponent } from './component/poll/closed/poll';
import { SurveyComponent } from './component/survey/survey.component';
import { AddSurveyComponent } from './component/survey/add/add';
import { CurrentSurveyComponent } from './component/survey/current/survey';
import { ClosedSurveyComponent } from './component/survey/closed/survey';
import { ViewSurveyComponent } from './component/survey/view/survey';
import { StudentRatingComponent } from './component/studentRating/studentRating.component';
// import {MessageComponent} from './component/message/message.component';
// import {NewMessageComponent} from './component/message/new/new';
// import {ViewMessageComponent} from './component/message/view/view';
import {EventComponent} from './component/event/event.component';
import {SuggestionComponent} from './component/suggestion/suggestion.component';
import {SuggestionForMe} from './component/suggestion/for-me/forme';
import {SuggestionForStudent} from './component/suggestion/for-student/forstudent';
import {SuggestionAddComponent} from './component/suggestion/add/add';

/*Providers */
import { LoggedInGuard } from './component/login/login.gaurd';
import { CustomHttpService } from './providers/default.header.service';
import { CommonService } from './providers/common.service';
import { Configuration } from './providers/app.constant';
import { AuthService } from './providers/auth.service';
import { ComplaintService } from './providers/complaint.service';
import { HomeworkService } from './providers/homework.service';
import { ChartService } from './providers/chart.service';
import { CircularService } from './providers/circular.service';
import {XHRBackend, RequestOptions} from '@angular/http';
import {AdminService} from './providers/admin.service';
import {ValidationService} from './providers/formValidation.service';
import { AppreciationService} from './providers/appreciation.service';
import { PollService } from './providers/poll.service';
import {EventService} from './providers/event.service';
import { StudentRatingService } from './providers/studentRating.service';
import { SurveyService } from './providers/survey.service';
import {SuggestionService} from './providers/suggestion.service';


@NgModule({
  imports: [
    BrowserModule,
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    RouterModule.forRoot(rootRouterConfig, { useHash: true })
  ],
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    ForgotPassword,
    DashboardComponent,
    ComplaintComponent,
    CircularComponent,
    AddCircular,
    HomeworkComponent,
    HomeworkAddComponent,
    CurrentHomework,
    PassedHomework,
    GoogleChart,
    CustomLoader,
    AccountComponent,
    AppreciationComponent,
    ForMeComponent,
    ByMeComponent,
    AddEmployeeComponent,
    AddAppreciation,
    PollComponent,
    AddPollComponent,
    CurrentPollComponent,
    ClosedPollComponent,
    CalendarComponent,
    EventComponent,
    SurveyComponent,
    AddSurveyComponent,
    CurrentSurveyComponent,
    ClosedSurveyComponent,
    PollComponent,
    AddPollComponent,
    CurrentPollComponent,
    ClosedPollComponent,
    StudentRatingComponent,
    ViewSurveyComponent,
    SuggestionComponent,
    SuggestionForMe,
    SuggestionForStudent,
    SuggestionAddComponent,
  ],
  providers: [
    LoggedInGuard,
    Configuration,
    CommonService,
    CustomHttpService,
    AuthService,
    ComplaintService,
    ChartService,
    HomeworkService,
    CircularService,
    ValidationService,
    AdminService,
    AppreciationService,
    PollService,
    EventService,
    PollService,
    StudentRatingService,
    SurveyService,
    SuggestionService,
  {
      provide: CustomHttpService,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new CustomHttpService(backend, defaultOptions);
      },
      deps: [XHRBackend, RequestOptions]
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
