import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RecentProductsService {

  url:string = "http://localhost:8000/api/product/recent?limit=2";

  constructor(private http:HttpClient){

  }
  getRecentProduct(){
    return  this.http.get(this.url,{});
  }
}
