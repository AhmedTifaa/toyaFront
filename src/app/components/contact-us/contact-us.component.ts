import { Component, OnInit } from '@angular/core';
import { ContactUsService } from "./contact-us.service";

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  check:boolean = false;
  data:any;
  contactUsStatus:boolean = false;
  isOn:boolean = false;
  constructor( private contactUsService:ContactUsService) { 
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

}
