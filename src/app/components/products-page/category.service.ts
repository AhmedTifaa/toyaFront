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
    return  this.http.get(this.url,{});
  }

  getFilter(){
    return  this.http.get(this.filterUrl,{});
  }
}
