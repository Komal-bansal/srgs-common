import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { XHRBackend, RequestOptions, HttpModule } from '@angular/http';

import { MainComponent } from "./main.component";
import { EventComponent } from "../event/event.component";
import { FoodmenuComponent } from "../foodmenu/foodmenu.component"; 
import { ViewSurveyComponent } from "../survey/view/survey";
import { CalendarComponent } from "../../angular2-fullcalendar/src/calendar/calendar";
import { SharedModule } from '../../shared.module';

import { LoggedInGuard } from "../login/login.gaurd";
import { Configuration } from "../../providers/app.constant";
import { CommonService } from "../../providers/common.service";
import { CustomHttpService } from "../../providers/default.header.service";
import { AuthService } from "../../providers/auth.service";
import { ChartService } from "../../providers/chart.service";
import { ValidationService } from "../../providers/formValidation.service";
import { AdminService } from "../../providers/admin.service";
import { EventService } from "../../providers/event.service";
import { FoodmenuService } from "../../providers/foodmenu.service";

import { ErrorComponent } from "../error/error.component";
import { Error404Component } from "../error/error404";
const rootRouterConfig:Routes = [
{path : '' , redirectTo:'dashboard' , pathMatch:'full'},
  { path: '', component: MainComponent,
  children:[
    { path: 'dashboard', loadChildren: 'app/component/dashboard/dashboard.module#DashboardModule', canActivate: [LoggedInGuard] },
    { path: 'complaint', loadChildren : 'app/component/complaint/complaint.module#ComplaintModule', canActivate: [LoggedInGuard] },
    { path: 'circular', loadChildren: 'app/component/circular/circular.module#CircularModule', canActivate: [LoggedInGuard] },
    { path: 'time-table', loadChildren: 'app/component/timetable/timetable.module#TimeTable', canActivate: [LoggedInGuard] },
    { path: 'homework', loadChildren: 'app/component/homework/homework.module#HomeworkModule', canActivate: [LoggedInGuard],},
    { path: 'account', loadChildren : 'app/component/account/account.module#AccountModule', canActivate: [LoggedInGuard] },
    { path: 'add-employee', loadChildren : 'app/component/addEmployee/addEmployee.module#AddEmployeeModule', canActivate: [LoggedInGuard] },
    { path: 'add-student', loadChildren: 'app/component/addStudent/addStudent.module#AddStudentModule', canActivate: [LoggedInGuard] },
    { path: 'appreciation', loadChildren: 'app/component/appreciation/appreciation.module#AppreciationModule', canActivate: [LoggedInGuard]},
    { path: 'poll', loadChildren: 'app/component/poll/poll.module#PollModule', canActivate: [LoggedInGuard] },
    { path: 'conversation', loadChildren: 'app/component/message/message.module#MessageModule', canActivate: [LoggedInGuard], },
    { path: 'event', component: EventComponent, canActivate: [LoggedInGuard] },
    { path: 'foodmenu', component: FoodmenuComponent, canActivate: [LoggedInGuard] },
    
    { path: 'survey', loadChildren: 'app/component/survey/survey.module#SurveyModule', canActivate: [LoggedInGuard] },
    
    { path: 'student-profile', loadChildren: 'app/component/studentRating/studentRating.module#StudentRatingModule', canActivate: [LoggedInGuard] },
    { path: 'view-survey/:id', component: ViewSurveyComponent, canActivate: [LoggedInGuard] },
    { path: 'suggestion', loadChildren: 'app/component/suggestion/suggestion.module#SuggestionModule' },
    { path: 'foodmenu', loadChildren: 'app/component/foodmenu/foodmenu.module#FoodmenuModule', canActivate: [LoggedInGuard] },    
  ]
    
  },
  { path: 'error', component: ErrorComponent, canActivate: [LoggedInGuard] },
  { path: 'error404', component: Error404Component, canActivate: [LoggedInGuard] },
 { path: '**', redirectTo: '/error404', canActivate: [LoggedInGuard] },
];


@NgModule({
imports: [
  SharedModule,
  HttpModule,
  RouterModule.forChild(rootRouterConfig),
  ],
  declarations: [
    MainComponent,
    CalendarComponent,
    EventComponent,
    FoodmenuComponent,
    ViewSurveyComponent,
    ErrorComponent,
    Error404Component,
    ],
  providers: [
    LoggedInGuard,
    Configuration,
    CommonService,
    CustomHttpService,
    AuthService,
    ChartService,
    ValidationService,
    AdminService,
    EventService,
    FoodmenuService,
    {
      provide: CustomHttpService,
      useFactory: (backend: XHRBackend, defaultOptions: RequestOptions) => {
        return new CustomHttpService(backend, defaultOptions);
      },
      deps: [XHRBackend, RequestOptions]
    }
   ],
})
export class MainModule{ }