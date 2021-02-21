import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  url:string;

  constructor(private http:HttpClient){

  }

  getProduct(){
    return  this.http.get(this.url,{});
  }
}
