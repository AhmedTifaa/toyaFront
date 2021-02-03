import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LoginService } from './login.service';

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

  data:any;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

  onSubmit(): void {
    
    this.data = this.loginForm.value;
    this.loginService.login(this.data).subscribe(data=>{
      this.data = data["data"];
    });
    
    console.warn('login form has been submitted', this.data);

    // this.loginForm.reset();
  }

  ngOnInit() {
  }

}
