import {Component} from '@angular/core';
import {EventService} from '../../providers/event.service';
// import * as moment_ from 'moment';
// import {Http} from '@angular/http';

declare let $: any; 
@Component({
    selector:'event',
    templateUrl:'./event.component.html',
    styleUrls:['./event.component.css']
})
 export class EventComponent{

//    public currentMonth:any;
//     public newEvents:any;
//      public calendarOptions:any;
// // public d:any;
// // public j:any;
// // public v:any;
//       constructor(
//         public eventService:EventService,
//         public http:Http
//       ){}

//       ngOnInit(){
//         // this.newEvents=this.fetchEvents();
//         $.noConflict(); 
//         this.newEvents=[
//              {
//             title: ' Event1',
//             start: '2017-09-02',
//             end: '2017-09-10',
//             resourceEditable: true,
//             eventOverlap:true,
//             color:'brown',
//           },
//              {
//             title: 'Long Event111',
//             start: '2017-09-07',
//             end: '2017-09-11',
//             resourceEditable: true,
//             eventOverlap:true,
//             color:'brown',
//           },

//         ];
//         this.calendarOptions = 
//         {
//         fixedWeekCount : false,
//         editable: true,
//         eventLimit: true,
//         firstDay:1,
//                 selectable: true,
//                 selectHeader:true,
//         eventRender: function(event, element) {
//         element.attr('title', event.tip);},
//         header:{
//           right:'today, list prev,next'
//         } ,
//         events: [
//     {
//             title: 'All Day Event',
//             start: '2017-07-03'
//           },
//           {
//             title: 'Long Event',
//             start: '2017-09-07',
//             end: '2017-09-10',
//             resourceEditable: true,
//             eventOverlap:true,
//             color:'brown',
//           },
//         ],
//         eventClick:  function(event, jsEvent, view) {
//             $('#modalTitle').html(event.title);
//             $('#modalBody').html("this is desx");
            
//         $('#fullCalModal').modal();},
        
//   //  dayClick: (date, jsEvent, view) => this.clickDay(date, jsEvent, view),
//       // };
//       //     $('#mycalendar').fullCalendar({
//       // dayClick(date, jsEvent, view) {
//       //     console.log("clicked");
//       //     }});
        
//         // this.calendarOptions.events = this.newEvents;
//         // $('#myCalendar').fullCalendar('renderEvents', newEvents, true);
//         // $('#myCalendar').fullCalendar( 'addEventSource', this.fetchEvents());
        
//       }




//       // fetchEvents(){
//       //   this.currentMonth='june';        
//       //   this.eventService.getEvents(this.currentMonth).subscribe((res)=>{
//       //     console.log(res)
//       //   },(err)=>{})
//       // }
      
//     //     getCurrentMonth(){
//     //     var moment = $('#calendar').fullCalendar('getDate');
//     // alert("The current date of the calendar is " + moment.format());
//     //     }
//     // dayClick(date, allDay, jsEvent, view) {
//     // var title = prompt('Event Title:');
//     // this.http.post( 'https://cornerstone.ind-cloud.everdata.com/event/1',{
//     //        title: title,
//     //         start: date,
//     //         end: date
            
//     //     }) 


// //         alert('Clicked on: ' + date.format());

// //         alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);

// //         alert('Current view: ' + view.name);

// //         // change the day's background color just for fun
// //         $(this).css('background-color', 'red');

// //     }
// // });
// // clickDay(date:any, jsEvent:any, view:any){
// //   // console.log("clicked");
// //   // console.log(date);
// //   // console.log(jsEvent);
// //   // console.log(view);
  
// //     console.log('hé '+JSON.stringify(date));
// //           // $('#myModal').modal('show');

  
  
  
// // }
// // clickDay1(){
// //           // $('#myModal').modal('show');
// //           alert("this is s");
  
// // }
        
//  }
}