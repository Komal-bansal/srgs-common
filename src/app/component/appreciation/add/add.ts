import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppreciationService } from '../../../providers/appreciation.service';
import { CommonService } from '../../../providers/common.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

declare let $: any;
@Component({
  selector: 'add-appreciation',
  templateUrl: './add.html',
  styleUrls: ['./../appreciation.component.css']
})

export class AddAppreciation {
  public title: string = "New Appreciation";
  public appreciation: FormGroup;
  public submitProgress: boolean = false;
  public stan: any;
  standards: any = [];
  public standardId: any;
  public standard:any;
  students: any = [];
  subjects: any = [];
  public emptyStudents: boolean = true;
  public emptyStandards: boolean = true;
  public loader:boolean = false;
  public studentLoader:boolean=false;
  constructor(private appreciationService: AppreciationService,
    private commonService: CommonService,
    public router: Router,
    private _location: Location,

  ) {
    this.getStandards();
  }

  ngOnInit() {
    this.initForm();
  }

  public initForm() {
    this.standardId = null;
    this.appreciation = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.maxLength(2500)]),
      studentId: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    });
  }
  submitAppreciation() {
    this.submitProgress=true;
    this.appreciationService.postAppreciation(this.appreciation.value).subscribe((res) => {
      this.submitProgress=false;        
      this.initForm();
      $('#appreciationModal').modal('show');
    }, (err) => {
      this.router.navigate(['/error']);

    });
  }
  public getStandards() {
    // this.nl.showLoader();
    this.loader = true;
    this.appreciationService.getStandards().subscribe((res) => {
      if (res.status === 204) {
        this.standards = [];
        this.emptyStandards = true;
        this.loader = false;
        return;
      }
      this.standards = res;
      this.emptyStandards = false;
      this.loader = false;
    }, (err) => {
      this.router.navigate(['/error']);
    });
  }

  public getStudents(standard:any) {
    this.studentLoader=true;
    this.appreciation.controls["studentId"].reset();
    this.appreciationService.getStudents(standard).subscribe((res) => {
      if(res.status===204){
        this.students = [];
        this.emptyStudents = true;
        this.studentLoader=false;
        return;
      }
      this.studentLoader=false;
      this.emptyStudents = false;
      this.students = res;
    }, (err) => {
      this.router.navigate(['/error']);
    });

  }

}