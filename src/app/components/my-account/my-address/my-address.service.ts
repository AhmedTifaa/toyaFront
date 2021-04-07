import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyAddressService {

  url:string = "http://localhost:8000/api/shippingDetails";
  countryUrl:string = "http://localhost:8000/api/location/countries";
  cityUrl:string;
  regionUrl:string;
  lang:string;
  constructor(private http:HttpClient) {

  }

  getAddress(){
    return  this.http.get(this.url, {headers: new HttpHeaders({'Authorization':'Bearer ' + sessionStorage.getItem('userToken'), 'X-Localization': this.lang })});
  }

  updateAddress(data){
    return  this.http.post(this.url, data, {headers: new HttpHeaders({'Authorization':'Bearer ' + sessionStorage.getItem('userToken'), 'X-Localization': this.lang })});
  }

  getCountry(){
    return  this.http.get(this.countryUrl, {headers: new HttpHeaders({'X-Localization': this.lang })});
  }

  getCity(){
    return  this.http.get(this.cityUrl, {headers: new HttpHeaders({'X-Localization': this.lang })});
  }

  getRegion(){
    return this.http.get(this.regionUrl, {headers: new HttpHeaders({'X-Localization': this.lang })});
  }
}
