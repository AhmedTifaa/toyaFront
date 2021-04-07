import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MyAddressService } from './my-address.service';

@Component({
  selector: 'app-my-address',
  templateUrl: './my-address.component.html',
  styleUrls: ['./my-address.component.css']
})
export class MyAddressComponent implements OnInit {

  addressForm:any = this.formBuilder.group({
    country: "",
    city: "",
    region: "",
    address: "",
    address2: "",
    floor_number: "",
    department_number: "",
    area: "",
    street: "",
    zip_code: "",
  });
  check:boolean = false;
  data:any;
  countries:any;
  cities:any;
  regions:any;
  success:any;
  error:any;

  myAddressStatus:boolean = false;
  isOn:boolean = false;

  lang:string;
  constructor(private formBuilder: FormBuilder, private myAddressService:MyAddressService) {
    this.lang = (sessionStorage.getItem('lang') ? sessionStorage.getItem('lang') : 'en');
    this.myAddressService.lang = this.lang;
    this.myAddressService.getAddress().subscribe(data => {
      this.data = data['data'];
      this.addressForm = this.formBuilder.group({
        country: data['data']['country'],
        city: data['data']['city'],
        region: data['data']['region'],
        address: data['data']['address'],
        address2: data['data']['address2'],
        floor_number: data['data']['floor_number'],
        department_number: data['data']['department_number'],
        area: data['data']['area'],
        street: data['data']['street'],
        zip_code: data['data']['zip_code'],
      });
      console.log(this.data);
      this.myAddressService.cityUrl = "http://localhost:8000/api/location/cities/" + this.data['country'];
      this.myAddressService.getCity().subscribe(data => {
        this.cities = data['data'];
      });
      this.myAddressService.regionUrl = "http://localhost:8000/api/location/regions/" + this.data['city'];
      this.myAddressService.getRegion().subscribe(data => {
        this.regions = data['data'];
        
        this.myAddressStatus = true;
        this.checkIsOn();

      });
    });

    // this.check = true;

    this.myAddressService.getCountry().subscribe(data => {
      this.countries = data['data'];
    });

  }

  ngOnInit() {
    
  }

  checkIsOn(){
    if(this.myAddressStatus){
      this.isOn = true;
    }
  }

  onSubmit() {
    this.data = this.addressForm.value;
    this.myAddressService.updateAddress(this.data).subscribe(
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

  city($event){
    console.log($event.target.value);
    this.myAddressService.cityUrl = "http://localhost:8000/api/location/cities/" + $event.target.value;
    this.myAddressService.getCity().subscribe(data => {
      this.cities = data['data'];
      console.log(this.cities);
    });    
  }

  region($event){
    console.log($event.target.value);
    this.myAddressService.regionUrl = "http://localhost:8000/api/location/regions/" + $event.target.value;
    this.myAddressService.getRegion().subscribe(data => {
      this.regions = data['data'];
      console.log(this.regions);
    });    
  }

}
