import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsService {

  url:string;
  favUrl:string = "http://localhost:8000/api/favoriteProduct/";
  data:any;

  constructor(private http:HttpClient){

  }

  getProduct(){
    return  this.http.get(this.url,{});
  }

  favourite(){
    console.log(this.data);
    return this.http.post(this.favUrl, this.data, {headers: new HttpHeaders({'Authorization':'Bearer ' + sessionStorage.getItem('userToken')})});
  }

}
