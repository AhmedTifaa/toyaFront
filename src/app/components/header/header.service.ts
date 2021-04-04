import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {

  url:string = "http://localhost:8000/api/menu/first/top";

  constructor(private http:HttpClient){

  }
  getNavbar(){
    return  this.http.get(this.url,{});
  }
}