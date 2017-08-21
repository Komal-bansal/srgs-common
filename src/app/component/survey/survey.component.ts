import { Component } from '@angular/core';
import { SurveyService } from '../../providers/survey.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.css'],
})

export class SurveyComponent {
      constructor(private router:Router){
         this.router.navigate(["/survey/current-survey"]);
    }
    
}