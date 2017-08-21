import { Component, AfterViewInit, OnInit } from '@angular/core';
import { CircularComponent } from '../circular/circular.component';
import { ComplaintComponent } from '../complaint/complaint.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { HomeworkComponent } from '../homework/homework.component';
import { LoggedInGuard } from '../login/login.gaurd';
import { AppreciationComponent } from '../appreciation/appreciation.component';
import { AddSurveyComponent } from '../survey/add/add';
import { SurveyComponent } from '../survey/survey.component';
import { PollComponent } from '../poll/poll.component'
import { StudentRatingComponent } from '../studentRating/studentRating.component'
import { MessageComponent } from '../message/message.component';
import { AddEmployeeComponent } from '../addEmployee/addEmployee.component';
import { AddStudentComponent } from '../addStudent/addStudent.component';

import {EventComponent} from '../event/event.component';
import { SuggestionComponent } from '../suggestion/suggestion.component';

import { AccountComponent } from '../account/account.component';


declare let $: any;

@Component({
  selector: 'main',
  templateUrl: "./main.component.html",
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit {
  public displayProfile: boolean = true;
  public user: any;
  public role:any;
  public classTeacher:any;
  public isLoggedIn: boolean = false;
  public selectedIndex: any = 0;
  public pages = [
    { title: 'Dashboard', component: DashboardComponent, icon: 'icons/dashboard.png', url: '/dashboard' },
    { title: 'Complaints', component: ComplaintComponent, icon: 'icons/complaint.png', url: '/complaint' },
    { title: 'Suggestion', component: SuggestionComponent, icon: 'icons/suggestion.png', url: '/suggestion/for-me'} ,
    { title: 'Appreciation', component: AppreciationComponent, icon: 'icons/appreciation.png', url: '/appreciation' },
    { title: 'Messaging', component: MessageComponent, icon: 'icons/message.png', url: '/conversation'},
    { title: 'Events', component: EventComponent, icon: 'icons/event.png', url: '/event'},
    { title: 'Poll', component: PollComponent, icon: 'icons/poll.png', url: '/poll' },
    { title: 'Survey', component: SurveyComponent, icon: 'icons/survey.png', url: '/survey' },
    { title: 'Circular', component: CircularComponent, icon: 'icons/circular.png', url: '/circular' },
    { title: 'Homework', component: HomeworkComponent, icon: 'icons/homework.png', url: '/homework/current-homework' },
    { title: 'Student Rating', component: StudentRatingComponent, icon: 'icons/rating.png', url: '/student-profile' },

    //  { title: 'Add Employee', component: AddEmployeeComponent, icon: '', url:'/add-employee'},
    //  {title: 'Add Student', component: AddStudentComponent, icon: '', url: '/add-student'},
    
    // { title: 'Profile', component: AccountComponent, icon: 'icons/profile.png', url: '/account'},      
    // { title: 'Message', component: MessageComponent, icon: 'icons/message.png', url: '/messaging'},
    
  ];

  constructor(public log: LoggedInGuard) {

  }
  getSelectedLink(i: any) {
    this.selectedIndex = i;
  }
  ngOnInit() {
    //  $.noConflict(); 
    if (this.log.isLoggedIn()) this.isLoggedIn = true;
    else this.isLoggedIn = false;
    // this.checkStudentRating();
this.role=this.log.getData('role');
    
  }

  ngAfterViewInit() {

    var alterClass = function() {
      var ww = document.body.clientWidth;
      if (ww >= 521) {
      $("#wrapper").toggleClass("toggled");
      } else if (ww < 520) {
        $('#wrapper').removeClass('toggled');
      };
    };

     var shiftLeft=function(){
        if($('#wrapper').hasClass('toggled')){
           $('#page-content-wrapper').addClass('shiftLeft');
        }
        else{
           $('#page-content-wrapper').removeClass('shiftLeft');
        }
    }

  $(window).resize(function(){
    alterClass();
    shiftLeft();
        
  });

  alterClass();
  shiftLeft();
  
  $("#menu-toggle").click(function (e: any) {
     $("#wrapper").toggleClass("toggled");
     shiftLeft();
  }); 

  }
   logout() {
    localStorage.clear();
  }


}