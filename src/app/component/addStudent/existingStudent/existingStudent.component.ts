import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { AdminService } from '../../../providers/admin.service';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ValidationService } from '../../../providers/formValidation.service';
import { Router } from '@angular/router';
// import { Order } from '../../../providers/order.filter'; 



declare let $: any;
@Component({
  selector: 'existing-student',
  templateUrl: './existingStudent.component.html',
  styleUrls: ['./existingStudent.component.css'],
  // pipes:['Order'];
})

export class ExistingStudentComponent {

  public loader: boolean = false;
  public addForm: number; //for add sibling/parent form



  public students: any[]=[];
  public standards: any[];
  public addSiblingForm: FormGroup;
  public selectedStudent: any;
  public parentLimit: number;
  public siblingLimit: number;
  public addParentForm: any;
  public edit1: boolean = false;
  public edit2: boolean = false;
  public edit3: boolean = false;
  public editStudentForm: FormGroup;
  public editParentForm: FormGroup;
  public uploadPicForm: FormGroup;
  public selectedSibling: any;
  public selectedParent: any;
  public imgFile: any;
  public selectedImageUpload: any;
  public fileUrl: any;
  public emptySearchResult: any;
  public studentsCOPY: any=[];
  public selectedStandardId:any;
  public showStudent:boolean=false;
  public totalStudents:any;
  public studentsInfo:any;
  public showSearch:boolean=false;
  public showTable:boolean=false;

  // public showStudentDetails:boolean=false;
  constructor(public _location: Location,
    public as: AdminService,
    public fb: FormBuilder,
    public router: Router) {

    this.fileUrl = localStorage.getItem('fileUrl');

    this.getStandards();
    // this.initNewStudentForm();
    // this.getStudents();
    // this.initEditParentForm();
    // this.initAddSiblingForm();
    this.uploadPicForm = new FormGroup({
      file: new FormControl(''),
    });

  }

  public getStandards() {
    this.loader = true;
    this.as.getStandards().subscribe(res => {
      this.standards = res;
    console.log("fetch standard success");
      
      this.loader = false;
    },
      err => {
        this.errorPage();
        // console.log("err", err);
      })
  }

  public onSelectStandard(e:any){
    this.selectedStandardId=e;
    this.showSearch=true;
    this.getStudents();    
    this.showStudent=true;
  }

  public getStudents() {
    this.loader = true;
    this.as.getStudents(this.selectedStandardId).subscribe(res => {
      this.totalStudents=res.length;
      this.students = res;
      console.log(res);
      this.studentsCOPY = this.students;
      this.loader = false;
    },
      err => {
        // this.loader = false;
        this.errorPage();
        // console.log(err);
      })
  }
  public selected: boolean = false;
  public searchStudents(ev: any) {
    this.selected = true;
    let val = ev.target.value;
    if (val && val.trim() != '') {
      this.emptySearchResult = false;
      this.students = this.studentsCOPY.filter((item: any) => {
        return (item.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      if (this.students.length == 0) {
        this.emptySearchResult = true;
      }
    }
    else {
      this.selected = false;
    }
  }

  public getStudentDetails(ev: any) {
    this.showTable=false;
    this.showSearch=true;
    this.loader = true;
    this.selected = false;
    this.initAddParentForm();
    this.initAddSiblingForm();
    this.as.getStudentDetails(ev).subscribe(res => {

      // console.log("res", res);
      this.selectedStudent = res;
      this.parentLimit = 3 - this.selectedStudent.parents.length;
      this.siblingLimit = 10 - this.selectedStudent.siblings.length;
      this.loader = false;
    }, err => {
      this.errorPage();

    })
  }

  public getStudentsByStd(){
    // this.showStudentDetails=false;
    this.loader=true;
    this.as.getAllStudents(this.selectedStandardId).subscribe(res=>{
      this.loader=false;
      this.showSearch=false;
      this.showTable=true;
      this.studentsInfo=res;
      console.log(this.studentsInfo);
    },err=>{
      this.errorPage();
    })
  }

  public initAddSiblingForm() {
    // this.getSiblings();
    this.addSiblingForm = this.fb.group({
      students: this.fb.array([
        this.inItSibling(),
      ])
    })
  }

  public inItSibling() {
    return this.fb.group({
      "name": ['', [Validators.required]],
      "standardId": ['', [Validators.required]]
    });
  }

  public addSibling(e: any) {
    const control = <FormArray>e.controls['students'];
    control.push(this.inItSibling());
  }

  public removeSibling(form: any, index: any) {
    const control = <FormArray>form.controls['students'];
    control.removeAt(index);
    if (control.length == 0) {
      this.addForm = null;
    }
  }

  public submitSibling() {
    this.loader = true;
    this.as.addSibling(this.selectedStudent.id, this.addSiblingForm.value.students).subscribe(res => {
      // console.log(res);
      $('#updateModal').modal('show');
      this.getStudentDetails(this.selectedStudent.id);
      this.initAddSiblingForm();
      this.loader = false;
    },
      err => {
        // this.loader = false;
        this.errorPage();
        // console.log(err);
      })

  }

  public initAddParentForm() {
    this.addParentForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      nickName: new FormControl(''),
      contactNo: new FormControl('', [Validators.required, Validators.pattern('[2-9]{2}[0-9]{8}$')]),
      email: new FormControl('', [ValidationService.emailValidator]),
    })
  }

  public submitParentForm() {

    var studentIds = [this.selectedStudent.id];
    // studentIds.push(this.selectedStudent.id);
    this.selectedStudent.siblings.forEach((element: any) => {
      studentIds.push(element.id);
    })

    this.addParentForm.addControl("studentIds", new FormControl(studentIds));
    this.loader = true;
    this.as.addParent(this.selectedStudent.id, this.addParentForm.value).subscribe(res => {
      this.getStudentDetails(this.selectedStudent.id);
      $('#updateModal').modal('show');
      this.initAddParentForm();
      this.loader = false;
    },
      err => {
        this.loader = false;
        // console.log(err);
        if (err === "400 - Bad Request") {
          this.initAddParentForm();
          $('#errModal').modal('show');
        }
        else {
          this.errorPage();
        }
      })

  }

  //Update Information

  public initEditStudentForm() {
    this.editStudentForm = new FormGroup({
      name: new FormControl(this.selectedSibling.name, [Validators.required]),
      standardId: new FormControl(this.selectedSibling.standardId, [Validators.required]),
    })
  }

  public submitEditStudentForm() {
    this.loader = true;
    // console.log(this.editStudentForm.value);
    this.as.updateStudent(this.selectedSibling.id, this.editStudentForm.value).subscribe(res => {

      $('#editSiblingModal').modal('hide');
      this.getStudentDetails(this.selectedStudent.id);
      $('#updateModal').modal('show');
      this.loader = false;
    },
      err => {
        this.errorPage();
        // console.log(err);
      })
  }

  public initEditParentForm() {
    // console.log(this.selectedParent);
    if (this.selectedParent)
      this.editParentForm = new FormGroup({
        name: new FormControl(this.selectedParent.name),
        nickName: new FormControl(this.selectedParent.nickName),
        email: new FormControl(this.selectedParent.email, [ValidationService.emailValidator]),
      });
  }

  public submitEditParentForm() {
    this.loader = true;
    this.as.updateParent(this.selectedParent.id, this.editParentForm.value).subscribe(res => {
      $('#editParentModal').modal('hide');
      this.getStudentDetails(this.selectedStudent.id);
      $('#updateModal').modal('show');
      this.loader = false;
    },
      err => {
        this.errorPage();
        // console.log(err);
      })
  }

  public uploadParentImage() {
    this.loader = true;
    let formData = new FormData();
    formData.append('file', this.imgFile);
    // console.log(this.selectedImageUpload.id);
    this.as.uploadParentImage(this.selectedImageUpload.id, formData).subscribe(res => {
      this.getStudentDetails(this.selectedStudent.id);
      $('#updateModal').modal('show');
      this.uploadPicForm.reset();
      this.loader = false;
    },
      err => {
        // console.log(err);
        this.errorPage();
      })
    this.selectedImageUpload = null;
  }

  public uploadStudentImage() {
    this.loader = true;
    let formData = new FormData();
    formData.append('file', this.imgFile);
    // console.log(this.selectedImageUpload.id);
    this.as.uploadStudentImage(this.selectedImageUpload.id, formData).subscribe(res => {
      this.getStudentDetails(this.selectedStudent.id);
      $('#updateModal').modal('show');
      this.uploadPicForm.reset();
      this.loader = false;
    },
      err => {
        this.errorPage();
        // console.log(err);
      })
    this.selectedImageUpload = null;
  }

  getFile(event: any) {
    var blob = event.srcElement.files[0];
    if (blob)
      if (blob.type == "image/png" || blob.type == "image/jpeg" || blob.type == "image/jpg") {
        this.imgFile = event.srcElement.files[0];
      }
      else {
        this.uploadPicForm.controls['file'].reset();
        $('#errorModal').modal('show');
      }

  }

  public errorPage() {
    this.loader = false;
    this.router.navigate(['/error']);
  }
public filter:any;
public showSibling:boolean=true;
public showParent:boolean=true;
  public filterDetails(e:any){
    if(e==1){
      this.showParent=true;
      this.showSibling=true;
    }

    else if(e==2){
      this.showParent=false;
      this.showSibling= true;
    }

    else if(e==3){
      this.showParent=true;
      this.showSibling=false;
    }
  }
// public order:any;
//   public orderDetails(e:any){    
//     if(e==1){
//       // console.log("kjnkjn");
//       this.studentsInfo.reverse;
//     }
//   }

}