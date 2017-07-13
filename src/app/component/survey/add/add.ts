import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';
import { CommonService } from '../../../providers/common.service';
import { SurveyService } from '../../../providers/survey.service';
import { ValidationService } from '../../../providers/formValidation.service'
import { Location } from '@angular/common';

declare let $: any;

@Component({
  selector: 'add-survey',
  templateUrl: './add.html',
  styleUrls: ['./add.css'],
})

export class AddSurveyComponent implements OnInit {

  public surveyForm: FormGroup;
  public standards: any[];
  public surveyInfo: any;
  public selectedStandard: any;
  // public oLimit: number = 5;
  // public qLimit: number = 5;
  // public disable: boolean = false;
  public loader: boolean = false;

  constructor(public cs: CommonService,
    public ss: SurveyService,
    public fb: FormBuilder,
    public vs: ValidationService,
    public _location: Location,
  ) { }

  ngOnInit(){
    this.loader=true;
    this.getSurveyInfo();
    this.initForm();
    this.getStandards();
  }

  public getStandards() {
    this.cs.getStandards().subscribe(res => {
      this.standards = res;
    },
      err => {
        console.log("err", err);
      })
  }

  public getSurveyInfo() {
    this.cs.getSurveyInfo().subscribe(res => {
      this.surveyInfo = res;
      // this.oLimit = this.surveyInfo.optionLimit;
      // this.qLimit = this.surveyInfo.questionLimit;
      this.loader = false;
    },
      err => {
        console.log("err", err);
      })
  }

  public initForm() {
    this.surveyForm = this.fb.group({
      'title': [(''), [Validators.required]],
      'description': [(''), [Validators.required]],
      'surveyTypeId': [(''), [Validators.required]],
      'expiredAt': [(this.cs.getTomorrow()), [Validators.required]],
      // 'standards': [('')],
      'surveyQuestions': this.fb.array([
        this.initQuestions(),
      ],Validators.minLength(1)
      // Validators.compose([ Validators.minLength(1), Validators.maxLength(this.qLimit)])
      ),
    })
  }

  onDueDate(e: any) {
    if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
      $('#dateErrorModal').modal('show');
      this.surveyForm.controls['expiredAt'].patchValue(this.cs.getTomorrow());
    }
  }

  public onTypeId(event: any) {
    if (event == "1") {
      this.surveyForm.removeControl("standards");
      this.selectedStandard = [];
      // this.disable = false;
    }
    else if (event == "2") {
      this.selectedStandard = [];
      // this.disable = true;
      this.surveyForm.addControl("standards", new FormControl((''),[Validators.required]));
    }
  }

  public onStandards(ev: any) {
    // this.disable = false;
    var stan = ev;
    this.surveyForm.controls['standards'].patchValue(stan);
  }

  public initQuestions() {
    return this.fb.group({
      'type': [(''), [Validators.required]],
      'text': [(''), [Validators.required]],
      'choices': this.fb.array([
        this.initOptions(),
        this.initOptions(),
      ],Validators.minLength(2),
      // Validators.compose([ Validators.minLength(2), Validators.maxLength(this.oLimit)])
      ),
    })
  }

  public addQuestions(e: any) {
    const control = <FormArray>e.controls['surveyQuestions'];
    control.push(this.initQuestions());
  }

  public removeQuestions(form: any, index: any) {
    const control = <FormArray>form.controls['surveyQuestions'];
    control.removeAt(index);
  }

  public initOptions() {
    return this.fb.group({
      'choice': [(''), [Validators.required]],
    })
  }

  public addOptions(e: any, i: any) {
    const control = <FormArray>e.controls['surveyQuestions'].controls[i].get("choices");
    control.push(this.initOptions());
  }

  public removeOptions(form: any, i: any, ii: any) {
   
    const control = <FormArray>form.controls['surveyQuestions'].controls[i].get("choices");
    control.removeAt(ii);
  }

  public submitSurvey() {
    this.loader = true;
    console.log("form value",this.surveyForm.value);

    this.ss.saveSurvey(this.surveyForm.value).subscribe(res => {
      this.loader = false;
      console.log("Survey", res);
      $('#submitModal').modal('show');
      this.initForm();
    },
      err => {
        console.log("err",err);
      })
  }

    // public onQuestionType(ev: any, form: any) {
  //   if (ev == 3) {
  //     console.log(ev);
  //     // const control = <FormArray>form.controls['surveyQuestions'].controls[i].get("choices");
  //     // control.setValidators(this.vs.minLengthArray(0));
  //     // var l = control.length - 1;
  //     // while (l >= 0) {
  //     //   this.removeOptions(form, i, l);
  //     //   l = l - 1;
  //     // }
  //     <FormGroup>form.removeControl("choices");
  //   }
  //   else {
  //     // const control = <FormArray>form.controls['surveyQuestions'].controls[i].get("choices");
  //     // control.setValidators(this.vs.minLengthArray(2));
  //   }
  // }
}