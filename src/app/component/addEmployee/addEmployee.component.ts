import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, FormControl, FormArray } from '@angular/forms';
import { AdminService } from '../../providers/admin.service';
import { HomeworkService } from '../../providers/homework.service'
import { ValidationService } from '../../providers/formValidation.service';
import { AuthService } from '../../providers/auth.service';

declare let $: any;

@Component({
  selector: 'add-employee',
  templateUrl: './addEmployee.component.html',
  styleUrls: ['./addEmployee.component.css']
})

export class AddEmployeeComponent implements OnInit {
  public standards: any = [];
  public subjects: any = [[]];
  public imgFile: any;
  public newEmpId: any;
  public loader:boolean = false;
  public userNameValid:boolean;
  public emailValid:boolean;
  public passwordValid:boolean;
  public contactValid:boolean;
  public profilePic: any = "https://cdn.pixabay.com/photo/2017/01/06/19/15/soap-bubble-1958650_960_720.jpg";
  public addEmployeeForm = this.fb.group({
  })
  constructor(public as: AdminService,
    public au: AuthService,
    public hs: HomeworkService,
    public fb: FormBuilder) {

  }

  ngOnInit() {
    this.initForm();
    // this.getStandards();
  }

  initForm() {
    this.addEmployeeForm = this.fb.group({
      "name": [''],
      "username": ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[A-Za-z]{1}[A-Za-z0-9]{3,19}')]],
      "nickName": [''],
      "password": ['', [Validators.required, Validators.pattern('^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{5,100}$')]],
      'email': ['', [ValidationService.emailValidator]],
      'contactNo': ['', [Validators.pattern('[2-9]{2}[0-9]{8}$')]],
      // "standardSubjects": this.fb.array([

      // ])
    })
     this.profilePic= "https://cdn.pixabay.com/photo/2017/01/06/19/15/soap-bubble-1958650_960_720.jpg";

  }

  public submitDetails() {
    // $('#myModal').modal('show');
    this.as.addEmployee(this.addEmployeeForm.value).subscribe(res => {
      console.log("res", res);
      this.newEmpId = res.id;
      $('#myModal').modal('show');
    },
      err => {
        if(err == "409 - Bad Request")
          $('#errorModal').modal('show');
        console.log("err", err);
      })
  }

  public getFile(event: any) {
    this.imgFile = event.srcElement.files[0];
    console.log("imageURL", this.imgFile);
  }

  public changePicture() {
    this.loader = true;
    let formData = new FormData();
    formData.append('file', this.imgFile);
    this.as.uploadImage(formData, this.newEmpId).subscribe((res: any) => {
      console.log("image", res.fileTimestamp);
      this.profilePic = res.blobInfo;
      console.log("profilePic", this.profilePic);
      this.loader = false;
    },
      err => {
        console.log("err", err);
      })
  }

  // restriction(){
  //   this.focus=true;
  //   this.blur=false;
  // }
}

 // getStandards() {
  //   this.as.getStandards().subscribe(res => {
  //     this.standards = res;
  //   },
  //     err => {
  //       console.log("error", err);
  //     })
  // }

  // getSubjects(id: any, index: any) {
  //   console.log("stan", id);
  //   this.hs.getSubjects(id).subscribe(res => {
  //     this.subjects[index] = res;
  //     console.log(this.subjects[index]);
  //   },
  //     err => {
  //       console.log("error", err);
  //     })
  // }

  // addStandard(e: any) {
  //   const control = <FormArray>e.controls['teacherStandards'];
  //   control.push(this.inItStandard());
  // }

  // removeStandard(form: any, index: any) {
  //   const control = <FormArray>form.controls['teacherStandards'];
  //   control.removeAt(index);
  // }

  // inItStandard() {
  //   return this.fb.group({
  //     "standardId": ['', Validators.required],
  //     "subjectId": ['', Validators.required],
  //   });
  // }