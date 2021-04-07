import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url:string = "http://localhost:8000/api/main_categories?limit=4";
  lang:string;
  constructor(private http:HttpClient){
    
  }
  getCategory(){
    console.log(this.url);
    return  this.http.get(this.url,{headers: new HttpHeaders({'X-Localization': this.lang })});
  }
}
