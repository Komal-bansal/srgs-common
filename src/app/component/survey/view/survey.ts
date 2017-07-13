import { Component,OnInit} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SurveyService } from '../../../providers/survey.service';
import { Location } from '@angular/common';

@Component({
  selector: 'view-survey',
  templateUrl: './survey.html',
  styleUrls:['./survey.css']

})

export class ViewSurveyComponent implements OnInit{

  public selectedSurvey: any;
  public id: any;

  constructor(private ss: SurveyService,
    private _location: Location,
    public route: ActivatedRoute) {}

    ngOnInit(){
      this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id); 
    });
    this.selectToExpand();
    }
  public selectToExpand(){
    this.ss.getSurvey(this.id).subscribe(res =>{
      this.selectedSurvey = res;
      console.log("res",this.selectedSurvey);
    },
    err =>{
      console.log("err",err);
    })
  }





}

