import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimeTableService } from '../../providers/timetable.service';
import { FormsModule,FormGroup, FormControl, Validators } from '@angular/forms';
import { LoaderStop } from '../../providers/loaderstop.service';

declare let $: any;
@Component({
 selector : "time-table",
 templateUrl : "./timetable.component.html",
 styleUrls : ["./timetable.component.css"]
})

export class TimetableComponent implements OnInit{
 private standards:any; 
 private standardLoader : any;
 private selectedStandard : any = 4 ;
 private timetable : any;
 private days : any[] = [] ;
 private daysdata : any[] = [];
 private endtime : string;
 private starttime : string;  
 private day : string ;
 private subjects : any[];
 private selectedSubject : any = 1 ;
 private timetableid : any;
 private showsubjectlist : boolean = true;
 private showsubjectname : boolean = false;
 private subjectName : string;
 private serialNo : any [] = [ 'Assembly','First','Second','Third','Snack','Fourth','Fifth','Sixth','Lunch','Seventh','Eighth','Ninth'];
 private loader:boolean = false;
 constructor(
 	public ls : LoaderStop,
  public ps: TimeTableService,
  public router:Router,
 ){ 
 this.ls.setLoader(false);
 }

 ngOnInit(){
 	this.getStandards();
  this.getTimeTable(this.selectedStandard);
 }

 getTimeTable(selectedstandard:any){
   this.days = [];
   this.daysdata = [];
   this.loader = true;
   this.ps.gettimeTable( selectedstandard ).subscribe(res => {
     if(res.status == 204){
      this.days = [];
      this.daysdata = [];
      this.timetable = [];
     }else{
      this.timetable = res;
      Object.keys(res).forEach( key => {
      this.daysdata.push(res[key]); 
      this.days.push(key); //key
      });
     }
     this.loader = false;
    
    },
      err => {
        this.router.navigate(['/error']);
      })
 }

  getModal(selectedstandard : any , x : any, i : any){
    if(x.subjectName!=null){
      this.showsubjectlist = false;
      this.showsubjectname = true;
    }
    else{
     this.showsubjectname = false;
     this.showsubjectlist = true; 
    }
    this.subjectName = x.subjectName;
    this.starttime = x.startTime;
    this.endtime = x.endTime;
    this.timetableid = x.id;
    this.day = this.days[i];
   
     $('#editSubject').modal('show');
     this.getSubject(selectedstandard); 
  }

  showlist(){
    this.showsubjectlist = true;
  }
 getSubject(selectedstandard:any){
   this.ps.getSubject(selectedstandard).subscribe(res => {
     this.subjects = res;
   
   },
     err => {
       this.router.navigate(['/error']);
     })
 }

 getValue( i : any ){
   if(i==0){
     return "Assembly";
   }
   else if(i==4){
     return "Snack";
   }
   else
     return "Lunch";
 }

 onSubmit( ){
   this.ps.onSubmit(this.timetableid,this.selectedSubject).subscribe(res => {
    this.refreshTimeTable();     
   },
     err => {
       this.router.navigate(['/error']);
     })

 }

 refreshTimeTable(){
   let s : any;
    for(let x of this.subjects){
       
       if(x.id == this.selectedSubject){
         s = x.name;
         break;
       }
     }
     
   for(let x of this.daysdata){

     for(let x1 of x){
        
       if(x1.id == this.timetableid){
         x1.subjectName = s;
         break;
       }
     }  
   }
 }

 getStandards() {
    this.standardLoader=true;
    this.ps.getStandards().subscribe(res => {
      this.standardLoader=false;
      this.standards = res;
    },
      err => {
        this.router.navigate(['/error']);
      })
  }
}