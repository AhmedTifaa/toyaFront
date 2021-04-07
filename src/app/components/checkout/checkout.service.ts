import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  countryUrl:string = "http://localhost:8000/api/location/countries/";
  cityUrl:string = "http://localhost:8000/api/location/cities/";
  regionUrl:string = "http://localhost:8000/api/location/regions/";
  confirmOrderUrl:string = "http://localhost:8000/api/order";
  lang:string;
  constructor(private http:HttpClient) {
  }
  getCountry(){
    return  this.http.get(this.countryUrl,{headers: new HttpHeaders({'X-Localization': this.lang })});
  }
  getCity(country){
    return  this.http.get(this.cityUrl+country,{headers: new HttpHeaders({'X-Localization': this.lang })});
  }
  getRegion(city){
    return  this.http.get(this.regionUrl+city,{headers: new HttpHeaders({'X-Localization': this.lang })});
  }
  confirmOrder(data){
    console.log(data);
    return  this.http.post(this.confirmOrderUrl, data, {headers: new HttpHeaders({'Authorization':'Bearer ' + sessionStorage.getItem('userToken'), 'X-Localization': this.lang})});
  }
}
