import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url:string;
  filterUrl:string;

  constructor(private http:HttpClient) { }
    
  getCategory(){
    console.log(this.url);
    return  this.http.get(this.url,{});
  }

  getFilter(){
    console.log(this.filterUrl);
    return  this.http.get(this.filterUrl,{});
  }
}
