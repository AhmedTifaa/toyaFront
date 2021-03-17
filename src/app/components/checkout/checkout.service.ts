import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  countryUrl:string = "http://localhost:8000/api/location/countries/";
  cityUrl:string = "http://localhost:8000/api/location/cities/";
  regionUrl:string = "http://localhost:8000/api/location/regions/";
  confirmOrderUrl:string = "http://localhost:8000/api/order";
  constructor(private http:HttpClient) {
  }
  getCountry(){
    return  this.http.get(this.countryUrl,{});
  }
  getCity(country){
    return  this.http.get(this.cityUrl+country,{});
  }
  getRegion(city){
    return  this.http.get(this.regionUrl+city,{});
  }
  confirmOrder(data){
    console.log(data);
    return  this.http.post(this.confirmOrderUrl, data, {headers: new HttpHeaders({'Authorization':'Bearer ' + sessionStorage.getItem('userToken')})});
  }
}
