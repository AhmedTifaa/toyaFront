import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContactUsService } from "./contact-us.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  messageForm = this.formBuilder.group({
    name: '',
    email: '',
    mobile: '',
    message: ''
  });

  response:any;
  check:boolean = false;
  data:any;
  contactUsStatus:boolean = false;
  isOn:boolean = false;
  lang:string;

  show:boolean = false;
  success:boolean = false;
  // successMessage:string;
  delay:any;  
  constructor(private formBuilder: FormBuilder, private contactUsService:ContactUsService) { 
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
    this.contactUsService.lang = this.lang;
    this.contactUsService.getContactUS().subscribe(data=>{
      this.data = data["contact_us"];
      this.check = true;
      console.log(this.data);
      this.contactUsStatus = true;
      this.checkIsOn();
    });
  }

  ngOnInit() {
  }

  checkIsOn(){
    if(this.contactUsStatus){
      this.isOn = true;
    }
  }

  onSubmit() {
    this.contactUsService.sendMessage(this.messageForm.value).subscribe(response => {
      // this.response = response['message']; 
      this.lang == 'ar'? this.response = 'تم إرسال الرسالة بنجاح' : this.response = 'Message sent Successfuly'
      this.success = true;
      this.showAlert();    
    },
    (err: HttpErrorResponse) => {
      this.lang == 'ar'? this.response = 'البينات المعطاة غير صحيحة' : this.response = 'The given data was invalid'
      this.showAlert(); 
    });
  }

  // alert
  close() {
    this.show = false;
    this.success = false;
    clearTimeout(this.delay);
  };


  showAlert() { 
    this.show = true;
    this.delay = setTimeout(() => this.show = false, 6000); 
  }

  mouseOver(){
    clearTimeout(this.delay);
  }

  mouseOut(){
    this.delay = setTimeout(() => this.show = false, 6000);
  }
}
