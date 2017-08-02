import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HomeworkService } from '../../../providers/homework.service';
import { Location } from '@angular/common';
import { CommonService } from '../../../providers/common.service';

declare let $:any;

@Component({
  selector: 'homework-add',
  templateUrl: './add.html',
  // styleUrls:['../homework.component.css']
  
})

export class HomeworkAddComponent implements OnInit{

  public title: string = "New Homework";
  public homework: FormGroup;
  public submitProgress:boolean = false;
  standards:any = [];
  subjects:any = [];


  constructor(private homeworkService: HomeworkService,
              private commonService: CommonService,
              private _location:Location) { }


  ngOnInit() {
    this.initForm();
    this.getStandards();
  }
  file:any;
  getFile(event:any){
    this.file = event.srcElement.files[0];
  }

  onDueDate(e:any){
    if(new Date(e.target.value) < new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())){
      alert("Please choose an upcoming date from the calendar.");
      this.homework.controls['dueDate'].patchValue(this.commonService.getTomorrow());
    }
  }

  public initForm() {
    this.homework = new FormGroup({
      description: new FormControl('', [Validators.required]),
      standardId: new FormControl('', [Validators.required]),
      subjectId: new FormControl('', [Validators.required]),
      dueDate: new FormControl(this.commonService.getTomorrow(), [Validators.required]),
      file: new FormControl('')
    });
  }

  getSubjects(a:any) {
    // this.nl.showLoader();
    this.homeworkService.getSubjects(a).subscribe((data) => {
      // this.nl.hideLoader();
      this.subjects = data;
    }, (err) => {
      // this.nl.onError(err);
      // this.viewCtrl.dismiss();
    });
  }

  public getStandards() {
    this.standards = this.commonService.getData("standards");
    if (typeof(this.standards) === 'undefined') {
      this._getStandards();
    }
  }

  public _getStandards() {
    // this.nl.showLoader();
    this.homeworkService.getStandards().subscribe((res) => {
      // this.nl.hideLoader();
      this.standards = res;
      this.commonService.storeData("standards", res);
    }, (err) => {
      // this.viewCtrl.dismiss();
      // this.nl.onError(err);
    });
  }

  submitHomework(){
    this.submitProgress = true;
    let formData = new FormData();
    formData.append('description',this.homework.value['description']);
    formData.append('standardId',this.homework.value['standardId']);
    formData.append('subjectId',this.homework.value['subjectId']);
    formData.append('dueDate',this.homework.value['dueDate']);
    formData.append('file', this.file);
    this.saveHomework(formData); 
    this.submitProgress = false;
  }

  // public presentActionSheet() {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'Are you sure you want to submit?',
  //     buttons: [{
  //       text: 'YES',
  //       role: 'submit',
  //       handler: () => {
  //         this.saveHomework();
  //       }
  //     }, {
  //       text: 'CANCEL',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }]
  //   });
  //   actionSheet.present();
  // }

  public saveHomework(formData:any) {
    console.log(formData);
    console.log("file",this.file);
    // this.nl.showLoader();
    this.homeworkService.PostHomework(formData).subscribe((data) => {
      $('#homeworkModal').modal('show');
      this.initForm();
      this.file=null;
      // this.nl.hideLoader();
      // this.viewCtrl.dismiss(data);
      // this.nl.showToast("Homework created successfully");
    },(err) => {
      // this.nl.onError(err);
      // this.viewCtrl.dismiss();
    });
  }

}