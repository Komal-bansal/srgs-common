import { Component, OnInit } from '@angular/core';
import { LoggedInGuard } from '../login/login.gaurd';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonService } from '../../providers/common.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';

declare let $: any;

@Component({
    selector: 'my-account',
    templateUrl: './account.component.html',
    styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
    public details: any;
    public uploadPicForm: FormGroup;
    public name: any = "";
    public nickName: any;
    public picUrl: any;
    public role: any;
    public email: any;
    public url: any = "";
    public newPicTimestamp: any;
    public imgFile: any;
    public loader: boolean = false;

    constructor(public lg: LoggedInGuard,
        public cs: CommonService,
        public au: AuthService,
        public router: Router,
        public route: ActivatedRoute, ) {
        this.url = this.router.url;

    }


    ngOnInit() {
        this.loadAccountDetails(this.details);
       this.initForm();

    }

    public initForm(){
         this.uploadPicForm = new FormGroup({
            imgFile: new FormControl("", [Validators.required]),

        })
    }

    public loadAccountDetails(details: any) {

        this.name = this.lg.getData('name');
        this.nickName = this.lg.getData('nickName');
        this.role = this.lg.getData('role');
        this.email = this.lg.getData('email');
        this.picUrl = this.lg.getData('picUrl');

    }

     getFile(event: any) {
    var blob = event.srcElement.files[0];
    if(blob.type=="image/png" || blob.type=="image/jpeg" || blob.type=="image/jpg"){
      this.imgFile = event.srcElement.files[0];
    }
    else{
       $('#errorModal').modal('show');
      this.initForm();
    }
  }

    public submitAccountDetails(details: any) {
        this.loader = true;
        let formData = new FormData();
        formData.append('file', this.imgFile);
        this.au.uploadImage(formData).subscribe((res: any) => {
            localStorage.setItem('picUrl', localStorage.getItem('fileUrl') + "/" + res.fileTimestamp);
            $('#myModal').modal('hide');
            this.uploadPicForm.reset();
            this.loader = false;
        },
            err => {
                this.loader = false;
                this.router.navigate(['/error']);
            })

    }
}