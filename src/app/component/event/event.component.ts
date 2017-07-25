import { Component, Input, OnInit, AfterViewInit, AfterContentChecked, AfterViewChecked, ElementRef} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EventService } from '../../providers/event.service';
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
  public calendarOptions:any;
  public pageNo:any=1;
     
  constructor(
     
    private eventService: EventService,
    private http: Http,
    private element:ElementRef
  ) {
    // $.noConflict();
    // this.viewEvent();
    // this.getEventById(id);
    this.getEvents(); 
    
     
  }

  ngOnInit() {
// this.newEvents=[];
     this.calendarOptions={
        fixedWeekCount: false,
        editable: true,
        eventLimit: true,
        firstDay: 1,
        selectable: true,
        selectHeader: true,
        header: {
          right: 'today,month,listMonth, prev,next'
        },
        
        events: [
          ],

        eventClick: function (event, jsEvent, view) {
          this.eventsInfo={
            'eventTitle':event.title,
            'startDate':JSON.stringify(event.start),
            // 'plannerType':event.planner,
            'endDate':JSON.stringify(event.end),
            'description':event.description,
            // 'location':event.location
          }
          $('#fullCalModal').modal();         
          $('#event-title').html(this.eventsInfo.eventTitle);
          $('#start-date').html(this.eventsInfo.startDate);
          $('#end-date').html(this.eventsInfo.endDate);
          // $('#planner-type').html(this.eventsInfo.plannerType);
          $('#description').html(this.eventsInfo.description);     
          $('#location').html(this.eventsInfo.location); 
        },

        select: function (start, end) {
          $('#fullCalView').modal();        
        }

      }
      
    this.event=this.initForm();   
    console.log(this.calendarOptions.events);
    //  this.calendarOptions.events = this.newEvents;
    // $('#myCalendar').fullCalendar('rerenderEvents');
      // _('#calendar').fullCalendar('renderEvents', this.newEvents, true);
    //  console.log(this.calendarOptions.events);
    // $('#calendar').fullCalendar({events: { title: 'All Day Event',
    //         start: '2017-07-03',
    //         description: 'testing'}});
  
  }

  ngAfterViewInit(){
      _('#calendar').fullCalendar('renderEvents', this.calendarOptions.events, true);
      console.log(this.calendarOptions.events);
    
  }
    public initForm(){ 
     return new FormGroup({
      title:new FormControl('', [Validators.required]),
      planner:new FormControl([], [Validators.required]),
      date:new FormControl('',[Validators.required]),
      endDate:new FormControl('',[Validators.required]),
      location:new FormControl(''),
      description:new FormControl(''),
     })

  }
    public getEvent(){
    this.eventService.GetEvent(this.pageNo).subscribe((res) => {
      console.log(res);
      }, (err) => {
      // this.onError(err);
    });
  }

      public getEvents(){
    this.eventService.GetEvents().subscribe((res) => {
    // this.newEvents=res;
      // _('#calendar').fullCalendar( 'removeEvents');
      // _('#calendar').fullCalendar('addEventSource',this.newEvents);
      // _('#calendar').fullCalendar('rerenderEvents');
      // console.log(this.newEvents);
    // this.newEvents=[
    //   {
    //     createdAt:"2017-07-05T12:21:57.349+0530",
    //     description:"",
    //     durationDays:0,
    //     durationHours:0,
    //     durationMinutes:0,
    //     employeeId:1606441971,
    //     employeeName:"Ms. Seema Singh",
    //     employeeUsername:"seema",
    //     end:"2017-07-26T12:21:59.000+0530",
    //     endDate:"2017-07-26",
    //     endTime:"12:21 PM",
    //     id:57,
    //     location:"",
    //     plannerTypeColor:"#F44336",
    //     plannerTypeId:4,
    //     plannerTypeName:"Restricted Holiday",
    //     start:"2017-07-26T12:21:01.000+0530",
    //     startDate:"2017-07-26",
    //     startTime:"12:21 PM",
    //     title:"njbnjbjbj"
    //   }]
    this.newEvents=res;
       _('#calendar').fullCalendar('addEventSource', this.newEvents);
      _('#calendar').fullCalendar('rerenderEvents');
      // console.log(res);
    console.log( this.newEvents);
      
    }, (err) => {
      // this.onError(err);
    });
  }

  
}