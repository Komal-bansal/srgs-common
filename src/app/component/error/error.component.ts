import {Component} from '@angular/core';
import {Location} from '@angular/common'

@Component({
  selector:'error',
  templateUrl:'./error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent{
  constructor(
    private _location:Location
  ){}
}