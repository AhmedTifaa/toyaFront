import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  url:string = "http://localhost:8000/api/main_categories";

  constructor(private http:HttpClient){

  }
  getCategory(){
    return  this.http.get(this.url,{});
  }
}
