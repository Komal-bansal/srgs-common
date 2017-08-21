import {Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../providers/auth.service';
import { Router } from '@angular/router';
@Component({
  selector:'login',
  templateUrl:'./login.component.html',
  styleUrls:['./login.component.css']
})
export class LoginComponent{
  public loader:boolean=false;
  loginForm: FormGroup;
  error:boolean = false;
  constructor(public formBuilder: FormBuilder,
              public appService: AuthService,
              public router: Router){
              if(appService.isLoggedIn()){                
                router.navigate(['/dashboard']);
              }
  }
  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required]]
    });
  }
  onSubmit(){
    this.loader=true;
    this.appService.verifyUser(this.loginForm.value).subscribe((res) => {
      this.loader=false;
      this.verifySuccessfully(res);
    }, (err) => {
      this.verifyFailed(err);
    });
  }

  public verifySuccessfully(res:any) {
    localStorage.setItem("access_token", res.access_token);
    this.getUserInfo();
  }

  public verifyFailed(err:any) {
    this.error = true;
    this.router.navigate(['/error']);
  }

  public getUserInfo() {
    this.appService.getUserInfo().subscribe((res) => {
      this.loggedInSuccesfully(res);
    }, (err) => {
       this.router.navigate(['/error']);
    });
  }

  public loggedInSuccesfully(res:any) {    
    this.appService.storeData(res);
    this.router.navigate(['/dashboard']);
  }    
}