import {Component} from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComplaintService } from '../../../providers/complaint.service';
import { ComplaintComponent } from '../../complaint/complaint.component';


@Component({
  selector:'for-me',
  templateUrl:'./forme.html',
  styleUrls:['./../appreciation.component.css']
  
})

export class ForMeComponent extends ComplaintComponent{

  constructor(public cs: ComplaintService,
    public router: Router,
    public route: ActivatedRoute) {
    super(cs,router,route);
    if(this.url == "/appreciation/for-me") this.url = "/appreciation";

  }  
}