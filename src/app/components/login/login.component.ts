import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from './login.service';

// import { Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  data: any;
  response: any;
  // isLogin:boolean;
  isLoginError: any;

  // subscription:Subscription;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router:Router) { 
    if(sessionStorage.getItem('userToken') != null){
      this.router.navigate(['/']);
    }
  }


  ngOnInit() {
  }

  onSubmit() {

    this.data = this.loginForm.value;
    this.loginService.login(this.data).subscribe(response => {
      this.response = response;
      // console.log('login form has been submitted', this.data);
      // console.log(this.response.token);
      sessionStorage.setItem('userToken', this.response.token);
      // this.isLogin = true;
      this.loginService.checkLogin(true);
      this.router.navigate(['/my-account']);      
    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
    });


    // this.loginForm.reset();
  }

}
