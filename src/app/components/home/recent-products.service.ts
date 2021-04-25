import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RecentProductsService {

  url:string = "http://localhost:8000/api/product/recent?limit=4";
  allUrl:string = "http://localhost:8000/api/product/recent";
  lang:string;
  constructor(private http:HttpClient){

  }
  getRecentProduct(){
    return  this.http.get(this.url,{headers: new HttpHeaders({'X-Localization': this.lang })});
  }

  getAllRecentProduct(){
    return  this.http.get(this.allUrl,{headers: new HttpHeaders({'X-Localization': this.lang })});
  }
}
