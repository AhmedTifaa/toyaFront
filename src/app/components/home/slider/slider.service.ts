import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';

@Injectable()
export class sliderService {
    url:string = "http://localhost:8000/api/home/slider";
    lang:string;
    constructor(private http:HttpClient){

    }
    getSlider(){
      return  this.http.post(this.url, {}, {headers: new HttpHeaders({'X-Localization': this.lang })});
    }
}