import { Component, OnInit } from '@angular/core';
import { HomeworkService } from '../../../providers/homework.service';
import { Router } from '@angular/router';

@Component({
  selector: 'current-homework',
  templateUrl: './homework.html',
  styleUrls: ['./../homework.component.css']
})

export class CurrentHomework implements OnInit {
  public selectedHomework: any;
  public fileUrl: string;
  public title: string = "Homework";
  public icon: string = "book";
  public currentPage = 1;
  public homeworks: any = [];
  loader: boolean = false;
  public EmptyHomeworks: boolean = true;


  constructor(private homeworkService: HomeworkService,
    public router: Router) { }

  ngOnInit(): void {
    this.fileUrl = localStorage.getItem("fileUrl") + "/";
    this.getHomeworks();
  }

  public getHomeworks() {
    // this.nl.showLoader();
    this.loader = true;
    this.homeworkService.getHomework(this.currentPage).subscribe((data) => {
      this.onSuccess(data);
    }, (err) => {
      this.loader = false;
      this.router.navigate(['/error']);
    });
  }

  public noMore: boolean = true;
  public onSuccess(res: any) {
    // this.nl.hideLoader();
    this.loader = false;
    if (res.status === 204) {
      this.EmptyHomeworks = true;
    } else {
      this.EmptyHomeworks = false;
      if(this.currentPage ==1)
      this.homeworks = res;
      else
      this.homeworks = this.homeworks.concat(res);
      if (res.length < 12) this.noMore = true;
      else this.noMore = false;

    }
  }

  public onError(err: any) {
    this.loader = false;
    this.router.navigate(['/error']);
  }

  // public previousHomework() {
  //   delete this.homeworks;
  //   this.currentPage -= 1;
  //   this.getHomeworks();
  // }

  public nextHomework() {
    // delete this.homeworks;
    this.currentPage += 1;
    this.getHomeworks();
  }

  public seletToExpand(a: any) {
    this.selectedHomework = a;
  }

}
