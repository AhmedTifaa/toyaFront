import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  url:string = "http://localhost:8000/api/page/contact_us";
  lang:string;
  constructor(private http:HttpClient){

  }
  getContactUS(){
    return  this.http.get(this.url,{headers: new HttpHeaders({'X-Localization': this.lang })});
  }
}
