import {Component, OnInit} from '@angular/core';
import { CircularService } from '../../providers/circular.service';
import { Router } from '@angular/router';
@Component({
  selector:'circular',
  templateUrl:'./circular.component.html',
  styleUrls:['./circular.component.css']
})
export class CircularComponent implements OnInit {

  title: string = 'Circular';
  public icon = "ios-paper-outline";
  public allCirculars:any;
  private currentPage = 1;
  public circulars:any;
  private EmptyCirculars: boolean = true;
  public loader:boolean = false;
  public fileUrl: string;
  public selectedCircular:any;
   public noMore:boolean = true;

  constructor(private circularService: CircularService,
                public router: Router) {
    
  }

  ngOnInit() {
    this.fileUrl = localStorage.getItem("fileUrl") + "/";
    this.getCirculars();
  }

  private getCirculars() {
    this.loader = true;
    this.circularService.GetCirculars(this.currentPage).subscribe((res) => {
      this.onSuccess(res);
    }, (err) => {
      this.onError(err);
    });
  }
 
  private onSuccess(data:any) {
    this.loader = false;
    if (data.status === 204) {  
      this.circulars = [];    
      this.EmptyCirculars = true;
      return;
    } else {
      if(this.currentPage==1)this.circulars=data
      else
      this.circulars = this.circulars.concat(data);
      if(data.length < 12) this.noMore = true;
      else this.noMore = false;
      this.EmptyCirculars = false;
    }
  }

  private onError(err:any) {
     this.loader = false;
      this.router.navigate(['/error']);
  }

  previousCircular(){
    delete this.circulars;
    this.currentPage -= 1;
    this.getCirculars();
  }

  nextCircular(){
    // delete this.circulars;
    this.currentPage += 1;
    this.getCirculars();
  }

  // public onCircularSelected(circular) {
  //   this.circularService.GetparticularCircular(circular.id).subscribe((res) => {
      
  //   }, (err) => {

  //   })
  // }

 public seletToExpand(circular:any){
    this.selectedCircular = circular;
  }

  // public doRefresh(refresher) {
  //   setTimeout(() => {
  //     this.circularService.GetCirculars(1).subscribe((res) => {
  //       this.onSuccess(res);
  //       refresher.complete();
  //     }, (err) => {
  //       refresher.complete();
  //       this.onError(err);
  //     });
  //   }, 500);
  // }

  // public doInfinite(infiniteScroll) {
  //   this.currentPage += 1;
  //   setTimeout(() => {
  //     this.circularService.GetCirculars(this.currentPage).subscribe(response => {
  //       infiniteScroll.complete();
  //       if (response.status === 204) {
  //         this.currentPage -= 1;
  //         return;
  //       }
  //       this.circulars = this.circulars.concat(response);
  //     }, (err) => {
  //       this.currentPage -= 1;
  //       infiniteScroll.complete();
  //     });
  //   }, 1000);
  // }
}