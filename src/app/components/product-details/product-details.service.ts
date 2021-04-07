import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  url:string;
  favUrl:string = "http://localhost:8000/api/favoriteProduct/";
  data:any;
  lang:string;
  constructor(private http:HttpClient){

  }

  getProduct(){
    return  this.http.get(this.url,{headers: new HttpHeaders({'X-Localization': this.lang })});
  }

  favourite(){
    console.log(this.data);
    return this.http.post(this.favUrl, this.data, {headers: new HttpHeaders({'Authorization':'Bearer ' + sessionStorage.getItem('userToken'), 'X-Localization': this.lang})});
  }

}
