import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, FormArray } from '@angular/forms';
import { CommonService } from '../../../providers/common.service';
import { PollService } from '../../../providers/poll.service';
import { Location } from '@angular/common';

declare let $: any;

@Component({
  selector: 'add-poll',
  templateUrl: './add.html',
  styleUrls: ['./add.css'],
})

export class AddPollComponent implements OnInit {

  public pollInfo: any;
  public standards: any;
  public selectedStandard: any;
  // public disable: boolean = false;
  public loader: boolean = false;

  public addPollForm: FormGroup;

  constructor(public fb: FormBuilder,
    public cs: CommonService,
    public ps: PollService,
    private _location: Location) {
  }

  ngOnInit() {
    this.getPollInfo();
    this.initForm();
    this.getStandards();
     $.noConflict(); 
  }

  public initForm() {
    this.addPollForm = this.fb.group({
      'question': ['', [Validators.required]], //title
      'typeId': ['', [Validators.required]], //School, Class
      'expiredAt': [this.cs.getTomorrow(), [Validators.required]], //Due Date
      'optionTypeId': ['', [Validators.required]],
      // 'standardIds': ['',[Validators.required]],
      'subOptions': this.fb.array([
        this.initOptions(),
        this.initOptions(),], Validators.minLength(2)),
    })
  }

  getStandards() {
    this.ps.getStandards().subscribe(res => {
      this.standards = res;
    },
      err => {
        console.log("standardError", err);
      })
  }

  getPollInfo() {
    this.loader = true;
    this.cs.getPollInfo().subscribe(res => {
      this.pollInfo = res;
      this.loader = false;
    },
      err => {
        console.log("Err", err);
        this.loader = false;
      })

  }

  public onTypeId(event: any) {
    if (event == "1") {
      this.addPollForm.removeControl("standardIds");
      this.selectedStandard = [];
      // this.disable = false;
    }
    else if (event == "2") {
      this.selectedStandard = [];
      // this.disable = true;
      this.addPollForm.addControl("standardIds", new FormControl('',Validators.required));
    }
  }

  public onStandards(ev: any) {
    // this.disable = false;
    var stan = ev;
    this.addPollForm.controls['standardIds'].patchValue(stan);
  }

  onDueDate(e: any) {
    if (new Date(e.target.value) < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())) {
      $('#dateErrorModal').modal('show');
      this.addPollForm.controls['expiredAt'].patchValue(this.cs.getTomorrow());
    }
  }

  public initOptions() {

    return this.fb.group({
      choice: ['', [Validators.required]]
    });

  }

  public addOptions(e: any) {
    const control = <FormArray>e.controls['subOptions'];
    control.push(this.initOptions());
  }

  public removeOptions(form: any, index: any) {
    const control = <FormArray>form.controls['subOptions'];
    control.removeAt(index);
  }

  public submitPoll(obj: any) {
    this.ps.createPoll(obj).subscribe(res => {
      this.loader = false;
      $('#submitModal').modal('show');
      this.initForm();
    },
      err => {
        console.log("err", err);
        this.loader = false;
      })
  }

}