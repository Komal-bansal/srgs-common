import {Component} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComplaintService } from '../../../providers/complaint.service';
import { ComplaintComponent } from '../../complaint/complaint.component';
// import {AppreciationService} from './../../../providers/appreciation.service';


@Component({
  selector:'for-student',
  templateUrl:'./byme.html'
})

export class ByMeComponent extends ComplaintComponent{
  

  constructor(public cs: ComplaintService,
    public router: Router,
    public route: ActivatedRoute) {
    super(cs,router,route);
  }  

  
}