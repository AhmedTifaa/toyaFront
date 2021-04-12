import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactUsService {

  url:string = "http://localhost:8000/api/page/contact_us";
  messageUrl:string = "http://localhost:8000/api/contactus_message"
  lang:string;
  constructor(private http:HttpClient){

  }
  getContactUS(){
    return  this.http.get(this.url,{headers: new HttpHeaders({'X-Localization': this.lang })});
  }

  sendMessage(message){
    return this.http.post(this.messageUrl, message);
  }
}
