import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  url:string = "http://localhost:8000/api/footer";

  constructor(private http:HttpClient){

  }
  getFooter(){
    return  this.http.get(this.url,{});
  }
}
