import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  url:string;
  lang:string;
  constructor(private http:HttpClient) { 

  }

  filter(data){
    return  this.http.post(this.url, data, {headers: new HttpHeaders({'X-Localization': this.lang })});
  }
}
