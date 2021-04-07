import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AboutUsService {

  url:string = "http://localhost:8000/api/page/about_us";
  lang:string;
  constructor(private http:HttpClient){

  }
  getAboutUS(){
    return  this.http.get(this.url,{headers: new HttpHeaders({'X-Localization': this.lang })});
  }
}
