import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login/login.service';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = this.formBuilder.group({
    name: '',
    email: '',
    mobile: '',
    password: '',
    password_confirmation: '',
    country_id: '',
  });

  data:any;
  response:any;
  error: any = false;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router, private loginService:LoginService) {
    if(sessionStorage.getItem('userToken') != null){
      this.router.navigate(['/']);
    }
  }

  onSubmit() {
    
    this.data = this.registerForm.value;
    this.registerService.login(this.data).subscribe(data=>{
      this.response = data;
      sessionStorage.setItem('userToken', this.response.token);
      this.loginService.checkLogin(true);
      this.router.navigate(['/my-account']);
    },
    (err: HttpErrorResponse) => {
      this.error = err['error']['errors'];
      console.log(err['error']['errors']);
    });
  }

  ngOnInit() {
  }

}
