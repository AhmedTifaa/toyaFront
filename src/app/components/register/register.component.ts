import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService) { }

  onSubmit(): void {
    
    this.data = this.registerForm.value;
    this.registerService.login(this.data).subscribe(data=>{
      this.data = data["data"];
    });
    
    console.warn('register form has been submitted', this.data);

    // this.loginForm.reset();
  }

  ngOnInit() {
  }

}
