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
  isLoginError: any;
  lang:string;
  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router:Router) { 
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
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
      sessionStorage.setItem('userToken', this.response.token);
      this.loginService.checkLogin(true);
      this.router.navigate(['/my-account']);      
    },
    (err: HttpErrorResponse) => {
      this.isLoginError = true;
    });
  }

}
