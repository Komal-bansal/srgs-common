import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ComplaintService } from '../../../providers/complaint.service';
import { ComplaintComponent } from '../../complaint/complaint.component';
@Component({
  selector: 'for-me',
 templateUrl: './forme.html',
  styleUrls:['./../../complaint/complaint.component.css']
})

export class SuggestionForMe extends ComplaintComponent{
  public statusId:any;
  public statusName:any[] = ["","New","Assigned","Inprogress","Closed","Reopen","Satisfied"];
  constructor(public cs: ComplaintService,
    public router: Router,
    public route: ActivatedRoute) {
    super(cs,router,route);
    if(this.url == "/suggestion/for-me") this.url = "/suggestion";
    if(this.complaintStatus) this.url = "/suggestion/status/" + this.complaintStatus;
    this.route.params.subscribe(param => {
      this.statusId = param['statusId'];
    });
  }  

}
