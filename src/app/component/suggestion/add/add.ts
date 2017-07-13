import {Component} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SuggestionService } from '../../../providers/suggestion.service';
import { CommonService } from '../../../providers/common.service';
import { Location } from '@angular/common';
 @Component({
  selector:'suggestion-add',
  templateUrl:'./add.html',
  // styleUrls:''
 })
 export class SuggestionAddComponent{

  // public title: string = "New Suggestion";
  public suggestion: FormGroup;
  public submitProgress:boolean = false;
  public stan:any;
  standards:any = [];
  public standardId:any;
  students:any=[];
  // subjects:any = [];
  constructor(  private suggestionService:SuggestionService,
                private commonService:CommonService,
                ){
  
                  // this.getStudents(a);
  }

  ngOnInit() {
    this.getStandards();
    this.initForm();
  }

    public initForm() {
    this.suggestion = new FormGroup({
      description: new FormControl('', [Validators.required,Validators.maxLength(2500)]),
      studentId: new FormControl('', [Validators.required]),
      title: new FormControl('', [Validators.required,Validators.maxLength(50)]),
            // standardId: new FormControl('', [Validators.required]),
      

    });
  }
    submitSuggestion(){
    this.submitProgress = true;
        this.suggestionService.postSuggestion(this.suggestion.value).subscribe((res) => {
      this.submitProgress = false;
      this.initForm();
      // $('#circularModal').modal('show');
    }, (err) => {

    });
    }
  public getStandards() {
    // this.nl.showLoader();
    this.suggestionService.getStandards().subscribe((res) => {
      this.standards = res;
      console.log(this.standards.standardId);
    }, (err) => {
    });
  }

   
   selectStandards(stan:any){
     this.standardId=stan;
     console.log(this.standardId);
    this.getStudents();
 }

   public getStudents() {
    // this.nl.showLoader();
    this.suggestionService.getStudents(this.standardId).subscribe((res) => {
      this.students = res;
      console.log(this.students);
    }, (err) => {
    });
  }
 }