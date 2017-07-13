import { Component,OnInit } from '@angular/core';
import { SurveyService } from '../../../providers/survey.service';

declare let $:any;

@Component({
  selector: 'closed-survey',
  templateUrl: './survey.html',
  styleUrls: ['./survey.css'],
})

export class ClosedSurveyComponent  implements OnInit{
  public currentPage: number = 1;
  public surveys: any[];
  public selectedSurvey: any;
  public emptySurveys: boolean = false;
  public noMore: boolean = false;


  constructor( public ss: SurveyService) {  }

  ngOnInit(){
    this.getSurveys();
  }
  public getSurveys(){
    this.ss.getClosedSurveys(this.currentPage).subscribe(res=>{
      if(res.status == 204){
        this.emptySurveys = true;
        return;
      }
      this.surveys = res;
     if(this.surveys.length < 10) this.noMore = true;
      else this.noMore = false;
      console.log("success", this.surveys);
    },
    err=>{
      console.log("err",err);
    })
  }

  public previousSurvey() {
    delete this.surveys;
    this.currentPage -= 1;
    this.getSurveys();
  }

  public nextSurvey() {
    delete this.surveys;
    this.currentPage += 1;
    this.getSurveys();
  }

}