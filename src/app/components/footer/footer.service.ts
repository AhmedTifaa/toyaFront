import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  url:string = "http://localhost:8000/api/footer";
  lang:string;
  constructor(private http:HttpClient){

  }
  getFooter(){
    return  this.http.get(this.url,{headers: new HttpHeaders({'X-Localization': this.lang })});
  }
}
