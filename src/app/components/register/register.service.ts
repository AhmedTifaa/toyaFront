import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  url:string = "http://localhost:8000/api/register";
    
  constructor(private http:HttpClient){

  }
  login(data){
    console.log(data);
    return  this.http.post(this.url,data);
    
  }
}
