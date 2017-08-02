import {Component, AfterViewInit,OnInit} from '@angular/core';
import { CircularComponent } from '../circular/circular.component';
import { ComplaintComponent } from '../complaint/complaint.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeworkComponent } from '../homework/homework.component';
import { LoggedInGuard } from '../login/login.gaurd';
import {AppreciationComponent} from '../appreciation/appreciation.component';
import { AddSurveyComponent } from '../survey/add/add';
import { SurveyComponent } from '../survey/survey.component';
import { PollComponent } from '../poll/poll.component'
import { StudentRatingComponent } from '../studentRating/studentRating.component'
import {MessageComponent} from '../message/message.component';
import {EventComponent} from '../event/event.component';
import {SuggestionComponent} from '../suggestion/suggestion.component';

import {AccountComponent} from '../account/account.component';


declare let $:any;

@Component({
  selector:'main',
  templateUrl:"./main.component.html",
  styleUrls:['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit{
  public displayProfile:boolean=true;
  public user:any;
  public isLoggedIn:boolean = false;
  public selectedIndex:any=0;
  public pages = [
      { title: 'Dashboard', component: DashboardComponent, icon: 'icons/dashboard.png', url: '/dashboard' },
      { title: 'Complaints', component: ComplaintComponent, icon: 'icons/complaint.png', url: '/complaint' },
      { title: 'Circular', component: CircularComponent , icon: 'icons/circular.png', url: '/circular'},
      { title: 'Homework', component: HomeworkComponent, icon: 'icons/homework.png', url: '/homework/current-homework' },
      { title: 'Appreciation', component: AppreciationComponent, icon: 'icons/appreciation.png', url: '/appreciation/for-me' },
      { title: 'Survey', component: SurveyComponent, icon: 'icons/survey.png', url: '/survey/current-survey'},
      { title: 'Poll', component: PollComponent, icon: 'icons/poll.png', url: '/poll/current-poll'},
      { title: 'Student Rating', component: StudentRatingComponent, icon: 'icons/rating.png', url: '/student-profile'},
      { title: 'Suggestion', component: EventComponent, icon: 'icons/suggestion.png', url: '/suggestion/for-me'} ,
      { title: 'Profile', component: AccountComponent, icon: 'icons/profile.png', url: '/account'},      
      // { title: 'Message', component: MessageComponent, icon: 'icons/message.png', url: '/messaging'},
      { title: 'Events', component: EventComponent, icon: 'icons/event.png', url: '/event'}
    
    ];

  constructor(public log:LoggedInGuard){
    
  }
    getSelectedLink(i:any){
    this.selectedIndex=i;
  }
  ngOnInit(){
     $.noConflict(); 
    if(this.log.isLoggedIn()) this.isLoggedIn = true;
    else this.isLoggedIn = false;
  }

  ngAfterViewInit(){
    $("#wrapper").toggleClass("toggled");
    $("#menu-toggle").click(function(e:any) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
  }
  logout(){
    localStorage.clear();
  }


}