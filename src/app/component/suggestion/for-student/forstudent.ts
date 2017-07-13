import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComplaintService } from '../../../providers/complaint.service';
import { ComplaintComponent } from '../../complaint/complaint.component';

@Component({
  selector: 'for-student',
  templateUrl: './forstudent.html',
  styleUrls:['./../../complaint/complaint.component.css','./../suggestion.component.css'],
})

export class SuggestionForStudent extends ComplaintComponent{

  constructor(public cs: ComplaintService,
    public router: Router,
    public route: ActivatedRoute) {
    super(cs,router,route);
  }  

}
