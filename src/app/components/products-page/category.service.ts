import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url:string;
  filterUrl:string;
  lang:string;
  constructor(private http:HttpClient) { }
    
  getCategory(){
    return  this.http.get(this.url,{headers: new HttpHeaders({'X-Localization': this.lang })});
  }

  getFilter(){
    return  this.http.get(this.filterUrl,{headers: new HttpHeaders({'X-Localization': this.lang })});
  }
}
