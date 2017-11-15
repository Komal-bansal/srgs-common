import {Component} from '@angular/core';
import {Location} from '@angular/common'

import { LoaderStop } from "../../providers/loaderstop.service";

@Component({
  selector:'error',
  templateUrl:'./error.component.html',
  styleUrls: ['./error.component.css']
})

export class ErrorComponent{
  constructor(
    private _location:Location,
    private ls : LoaderStop
  ){
  	ls.setLoader(false);
  }
}