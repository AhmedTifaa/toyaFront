import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CatProductsService {

  url:string = "http://localhost:8000/api/";

  constructor(private http:HttpClient){

  }
  getCatProduct(){
    return  this.http.get(this.url,{});
  }
}
