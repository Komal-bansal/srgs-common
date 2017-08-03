import { Component, Input, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked, ElementRef} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from '../../providers/event.service';
import {CommonService} from '../../providers/common.service';
import * as moment_ from 'moment';
import { Http } from '@angular/http';
import 'fullcalendar';
import * as _ from 'jquery';
declare let $: any;

@Component({
  selector: 'event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit, AfterViewInit {
  public event:FormGroup;
  public currentMonth: any;
  public newEvents: any;
  public calInstance:any;
  public thisdate:any;
  public eventsInfo:any;
  public eventId:any;
  // public calendarOptions:any;
  public pageNo:any=1;
  public eventMonth:any;
  public emptyEvent:boolean; 
  public planner:any; 
  public standard:any;
  public editEvent:FormGroup;
  public start:any;
  public end:any;
  public stdIds:any[];
  public selectedEvent:any;
  

  constructor(
     
    private eventService: EventService,
    private http: Http,
    private element:ElementRef,
    private cs:CommonService,
  ) {
    // this.getEvents(); 
    this.getPlanner();
    this.getStandardId();
     
  }

    ngOnInit() {   
    this.event=this.initForm(); 
    // this.editEvent=this.editForm(); 
    console.log(this.event);
  
  }

  ngAfterViewInit(){
      _('#calendar').fullCalendar('renderEvents', this.calendarOptions.events, true); 
  }
    
     public calendarOptions:any={
        fixedWeekCount: false,
        editable: true,
        eventLimit: true,
        firstDay: 1,
        selectable: true,
        selectHeader: true,
        timeFormat: ' ',
        header: {
          right: 'today,month,listMonth, prev,next'
        },
        
        events: [
          ],

        eventClick:(event, jsEvent, view)=> {
          this.selectedEvent=event;                    
          this.editEvent=this.editForm();
          this.event=this.initForm(); 
          this.getEventById(event.id);          
          // this.eventsInfo={
          //   'eventTitle':event.title,
          //   'startDate':JSON.stringify(event.start),
          //   'plannerType':event.plannerTypeName,
          //   'endDate':JSON.stringify(event.end),
          //   'description':event.description,
          //   // 'location':event.location
          //   'id':event.id,
          // }
          
          $('#fullCalModal').modal();         
          // $('#event-title').html(this.eventsInfo.eventTitle);
          // $('#start-date').html(this.eventsInfo.startDate);
          // $('#end-date').html(this.eventsInfo.endDate);
          // $('#planner-type').html(this.eventsInfo.plannerType);
          // $('#description').html(this.eventsInfo.description);     
          // $('#location').html(this.eventsInfo.location); 
          // this.eventId=event.id;
          // console.log(this.eventId);
        },

        select: (start, end)=> {
        if(start.isBefore(moment_().subtract(1, "days"))) {
          _('#calendar').fullCalendar('unselect');
          $('#modal-unselect').modal();
          return false;
          }
        else{
      this.event=this.initForm();            
          $('#fullCalView').modal();    
          this.start=moment_(start).format('YYYY-MM-DD');
          // $("#startDate1").val(this.start);
          var tomorrow = new Date(this.start);
          tomorrow.setDate(tomorrow.getDate() + 1);
          this.end=moment_(tomorrow).format('YYYY-MM-DD');
          // $('#end').val(this.end);          
        }
        },
        
        dayRender:function(date,cell){
          if(date.isBefore(moment_().subtract(1, "days")))
          cell.css("background-color","#fbfdff");
          cell.css("color","grey");
          
        },
      
        // that:0,
       viewRender: (view, element)=> {
          var b = _('#calendar').fullCalendar('getDate');
          var check = moment_(b, 'YYYY/MM/DD');
          var month = check.format('MM');
          var year  = check.format('YYYY');       
          this.eventMonth= year + "-" + month;
          this.getEvents();
      },
     }

    public initForm(){       
     return new FormGroup({
      title:new FormControl('', [Validators.required]),
      plannerTypeId:new FormControl([], [Validators.required]),
      startDate:new FormControl(this.start,[Validators.required]),
      endDate:new FormControl(this.end,[Validators.required]),
      startTime:new FormControl('',[Validators.required]),
      endTime:new FormControl('',[Validators.required]),
      location:new FormControl(''),
      description:new FormControl(''),
      // standardId:new FormControl('')
     })

  }
    public editForm(){
      return new FormGroup({
      // title:new FormControl(this.eventsInfo.title),
      // startDate:new FormControl(this.eventsInfo.startDate),
      // endDate:new FormControl(this.eventsInfo.endDate),
      // startTime:new FormControl(this.startTime),
      // endTime:new FormControl(this.endTime),
      // location:new FormControl(this.eventsInfo.location),
      // description:new FormControl(this.eventsInfo.description),
      title:new FormControl(this.selectedEvent.title),        
      startDate:new FormControl(this.selectedEvent.startDate),
      endDate:new FormControl(this.selectedEvent.endDate),
      startTime:new FormControl(this.selectedEvent.startTime),
      endTime:new FormControl(this.selectedEvent.endTime),
      location:new FormControl(this.selectedEvent.location),
      description:new FormControl(this.selectedEvent.description),
      // standardId:new FormControl('')
    })
    }



    public selectPlannerType(type:any){
    if(type==2){
      this.event.addControl("standardIds", new FormControl('', [Validators.required]));
      // console.log(this.event);
      console.log(type);
    }
    else{
      this.event.removeControl("standardIds");
      this.standard = [];
    }
  }

    public getEvents(){  
      this.eventService.GetEvents(this.eventMonth).subscribe((res) => {  
        if(res.status===204){
          this.emptyEvent=true;
        }
        else{ 
      this.newEvents=res;
      _('#calendar').fullCalendar('removeEvents');
      _('#calendar').fullCalendar('addEventSource', this.newEvents);
        }
      
    }, (err) => {
    });
  }
public startTime:any;
public endTime:any;
  public getEventById(id){
    this.eventService.GetEventById(id).subscribe((res)=>{
      this.eventsInfo=res;
      console.log(this.eventsInfo);
      $('#fullCalModal').modal('show');         
    this.startTime = moment_(this.eventsInfo.start).format('HH-MM-SS-A');
     this.endTime = moment_(this.eventsInfo.end).format('HH-MM-SS-A');
    })

  }

  public getPlanner(){
    this.eventService.GetPlanner().subscribe((res)=>{
      this.planner=res;
      console.log(res);
    },(err)=>{
      console.log("error");
    })
  }
      public getStandardId() {
    this.eventService.getStandards().subscribe((res) => {
      this.standard = res;
      console.log(this.standard);
    }, (err) => {
    });
  }

  public postEvent(){
    this.eventService.postEvent(this.event.value).subscribe((res)=>{
      $('#modal-success').modal('show');   
      this.getEvents();
    },(err)=>{
      console.log(this.event.value);
    })
  }

  public deleteEvent(){
    this.eventService.deleteEvent(this.eventsInfo.id).subscribe((res)=>{
      this.getEvents();
      
    },(err)=>{})
    
  }

  public updateEvent(){
    this.eventService.updateEvent(this.eventsInfo.id,this.editEvent.value).subscribe((res)=>{
      this.newEvents=res;
    },(err)=>{})
    console.log(this.editEvent.value);
  }


    public selectStandards(e:any){
    this.stdIds = [];
    e.forEach((element:any) => {
      this.stdIds.push(element.id);
    });
    this.event.controls['standardIds'].patchValue(this.stdIds);
    console.log(this.stdIds);
  }
  public currentDate:any;

  public onDueDate(e:any){
    this.currentDate=e.target.value;
    if(new Date(e.target.value) < new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())){
      alert("Please choose an upcoming date from the calendar.");
      this.event.controls['startDate'].patchValue(this.start);
      this.event.controls['endDate'].patchValue(this.start);
      console.log(this.start);
      console.log(this.event.value);
    }
  }

  public checkDate(e:any){
    if(new Date(e.target.value)<new Date(this.event.controls['startdate'].value))
      {
      alert("Please choose a date after start date");
      this.event.controls['endDate'].patchValue(this.start);
      }
    
  }


public onStartDate(e:any){
    // this.currentDate=e.target.value;
    if(new Date(e.target.value) < new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())){
      alert("Please choose an upcoming date from the calendar.");
      this.editEvent.controls['startDate'].patchValue(this.selectedEvent.startDate);
      this.editEvent.controls['endDate'].patchValue(this.selectedEvent.startDate);
      console.log(this.selectedEvent.startDate);
      console.log(this.event.value);
    }
  }

  public check(e:any){
    console.log(this.editEvent.controls['startDate'].value);
    if(new Date(e.target.value)<new Date(this.editEvent.controls['startDate'].value))
      {
      alert("Please choose a date after start date");
      this.editEvent.controls['endDate'].patchValue(this.selectedEvent.startDate);
      }
    
  }
}

