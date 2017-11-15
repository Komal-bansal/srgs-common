import {Component} from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { FormGroup,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector:'forgot-password',
  templateUrl:'./forgot.password.html',
  styleUrls:['./forgot.password.css']
})
export class ForgotPassword{
router : Router;
public forgotform:any=new FormGroup({
       username : new FormControl('')
    });


// public initForm()
// {
//   return new FormGroup({
//        username : new FormControl('')
//     })
// }
  constructor(private authService : AuthService){   
    // this.forgotform=this.initForm()
  }
  onSubmit(){
  	this.authService.forgotPassword(this.forgotform.value)
    .subscribe(response => {

    },err => {
    })
  }
  gotologin(){
  	this.router.navigate(['/login']);
  }
}