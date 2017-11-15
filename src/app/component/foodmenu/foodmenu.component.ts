import {Component, AfterViewInit} from '@angular/core';
import { FoodmenuService} from '../../providers/foodmenu.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment_ from 'moment';
import { Http } from '@angular/http';
import 'fullcalendar';
import * as _ from 'jquery';
import { Router } from '@angular/router';
declare let $: any;
import { LoaderStop } from '../../providers/loaderstop.service';

@Component({
    selector:'foodmenu',
    templateUrl:'./foodmenu.component.html',
    styleUrls:['./foodmenu.component.css'],
})

export class FoodmenuComponent implements AfterViewInit{

    public addItem:FormGroup;
    public addMenu:FormGroup;
    public message:any;
    public heading:any;
    public menuMonth:any;
    public foodItems:any;
    public loader:boolean=false;
    public itemLoader:boolean=false;
    public start:any;
    public selectedMenu:any={};
    // public submitProgress:any;

    constructor(
        private ls : LoaderStop,
        private fs:FoodmenuService,
            private http: Http,
    ){
        this.ls.setLoader(false);
        this.addItem=this.addItemForm();
        this.addMenu=this.addMenuForm();
        // this.getMenu();
        this.getItem();
    }


      ngAfterViewInit(){
    //   _('#menu').fullCalendar('renderEvents', this.menuOptions.events, true); 
  }

        public menuOptions:any={
        fixedWeekCount: false,
        editable: true,
        eventLimit: true,
        firstDay: 1,
        selectable: true,
        selectHeader: true,
        timeFormat: ' ',
        header: {
          right: 'today,month,listMonth, addItem prev,next '
        },
            customButtons: {
        addItem: {
            text: 'Food Item +',
            click: function() {
                $('#addItemModal').modal();
            }
        }
    },
        events: [
          ],
        
        viewRender: (view:any, element:any)=> {
          var b = _('#menu').fullCalendar('getDate');
          var check = moment_(b, 'YYYY/MM/DD');
          var month = check.format('MM');
          var year  = check.format('YYYY');       
          this.menuMonth= year + "-" + month;
        //   console.log(this.menuMonth);
          this.getMenu();
      },

        select:(start:any,end:any)=>{
        if(start.isBefore(moment_().subtract(1, "days"))) {
            _('#menu').fullCalendar('unselect');
            $('#modal-unselect').modal();
            return false;
        }
        else{
            this.start=moment_(start).format('YYYY-MM-DD');
            this.addMenu=this.addMenuForm();
            $('#addMenuModal').modal();    
        }
      },

        dayRender:function(date:any,cell:any){
          if(date.isBefore(moment_().subtract(1, "days"))){
          cell.css("background-color","#fbfbfb");
          // cell.css("color","grey");
          }
        else{
          cell.css("cursor","pointer");
          
        }
        },
    eventClick:(event:any, jsEvent:any, view:any)=> {
          this.selectedMenu=event; 
          $('#clickModal').modal();
                

        },

        eventMouseover: function(calEvent:any, jsEvent:any) {
            var tooltip = '<div class="tooltipevent" style="width:100px;height:60px;background:#ccc;position:absolute;z-index:10001;padding:7px;color:black;font-weight:500;font-size:15px">Click to view menu</div>';
            $("body").append(tooltip);
            $(this).mouseover(function(e:any) {
                $(this).css('z-index', 100);
                $('.tooltipevent').fadeIn('500');
                $('.tooltipevent').fadeTo('10', 1.9);
            }).mousemove(function(e:any) {
                $('.tooltipevent').css('top', e.pageY + 10);
                $('.tooltipevent').css('left', e.pageX + 20);
            });
        },

        eventMouseout: function(calEvent:any, jsEvent:any) {
            $(this).css('z-index', 8);
            $('.tooltipevent').remove();
        },
        }
        

    public addItemForm(){
        return new FormGroup({
            name:new FormControl('',[Validators.required]),
            type:new FormControl('', [Validators.required]),
            url:new FormControl('',[Validators.required])
        })
    }

    public addMenuForm(){
        return new FormGroup({
            foodId: new FormControl('',[Validators.required]),
            day:new FormControl(this.start,[Validators.required])
        })
    }
    public menu:any=[];
     public getMenu(){
         this.loader=true;
        this.fs.getMenu(this.menuMonth).subscribe(res=>{
            if(res.status==204){
                this.loader=false;
            }
            else{
                this.loader=false;
                var menuObj:any={};         
                res.forEach((element:any,index:any) => { 
                    menuObj=new Object({
                        title:res[index].foodName,
                        start:res[index].day,
                        foodPicUrl:res[index].foodPicUrl,
                        foodType:res[index].foodType,
                        id:res[index].id
                    });
                    this.menuOptions.events.push(menuObj);
                })    
                _('#menu').fullCalendar('removeEvents');                 
                _('#menu').fullCalendar('renderEvents', this.menuOptions.events, true); 
                this.menuOptions.events=[];
                
            }            
        },err=>{

        })
        
    }

    public getItem(){
        this.itemLoader=true;
        this.fs.getItem().subscribe(res=>{
        this.itemLoader=false;            
        // this.foodItems=JSON.parse(res);
        this.foodItems=res;
        },err=>{
        })
    }

    public postItem(){
        this.loader=true;
        this.fs.postItem(this.addItem.value).subscribe(res=>{
            this.loader=false;            
            this.message="You have successfully added the food item";
            this.heading="Successfully added";
            $('#messageModal').modal();
            this.getMenu();
        },err=>{

        })
    }

    public postMenu(){
        this.loader=true;        
        this.fs.postMenu(this.addMenu.value).subscribe(res=>{
            this.loader=false;            
            this.message="You have successfully added the food menu";
            this.heading="Successfully added";
            $('#messageModal').modal();
            this.getMenu();            
        },err=>{
            
        })
    }

    public onDueDate(e:any){
        if(new Date(e.target.value) < new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate())){
      this.message="Please choose an upcoming date from the calendar";
      this.heading="Invalid date input";
      $('#messageModal').modal('show');               
      this.addMenu.controls['day'].patchValue(this.start);
    }

    }
}