import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CatProductsService {

  url:string = "http://localhost:8000/api/home/product/sections";
  lang:string;
  constructor(private http:HttpClient){

  }
  getCatProduct(){
    return  this.http.post(this.url, {} ,{headers: new HttpHeaders({'X-Localization': this.lang })});
  }
}
