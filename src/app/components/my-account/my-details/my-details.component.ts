import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MyDetailsService } from './my-details.service';

import { MyAddressService } from "../my-address/my-address.service";

@Component({
  selector: 'app-my-details',
  templateUrl: './my-details.component.html',
  styleUrls: ['./my-details.component.css']
})
export class MyDetailsComponent implements OnInit {

  // detailsForm = this.formBuilder.group({
  //   name: '',
  //   email: '',
  //   mobile: ''
  // });

  detailsForm:any;

  check:boolean = false;
  data:any;
  success:any;
  error:any;
  country1:any;
  country2:any;

  countries:any;

  myDetailsStatus:boolean = false;
  isOn:boolean = false;

  lang:string;
  constructor(private formBuilder: FormBuilder, private myDetailsService:MyDetailsService, private myAddressService:MyAddressService) {
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
    
    this.myAddressService.lang = this.lang;
    this.myAddressService.getCountry().subscribe(data=>{
      this.countries = data['data'];
      console.log(this.countries);
    });

    this.myDetailsService.lang = this.lang;
    this.myDetailsService.getDetails().subscribe(data => {
      this.data = data['user'];
      this.detailsForm = this.formBuilder.group({
        name: data['user']['name'],
        email: data['user']['email'],
        mobile: data['user']['mobile'],
        country_id: data['user']['country_id']
      });
      // if (data['user']['country_id'] == '1') {
      //   this.country1 = true;
      // }else if(data['user']['country_id'] == '2'){
      //   this.country2 = true;
      // }
      this.check = true;

      this.myDetailsStatus = true;
      this.checkIsOn();

    });
  }

  ngOnInit() {

  }

  checkIsOn(){
    if(this.myDetailsStatus){
      this.isOn = true;
    }
  }

  onSubmit() {
    this.data = this.detailsForm.value;
    this.myDetailsService.updateDetails(this.data).subscribe(
      response => {
        this.error = "";
        this.success = response['message']
      },
      (err: HttpErrorResponse) => {
        this.success = "";
        this.error = err['error']['message']; 
        console.log(this.error);
      }
    );
    console.log(this.data);
  }

}
