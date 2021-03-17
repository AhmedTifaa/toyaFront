import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyDetailsService {

  getUrl:string = "http://localhost:8000/api/profile";
  updateUrl:string = "http://localhost:8000/api/profile/update";
  constructor(private http:HttpClient) {

  }

  getDetails(){
    return  this.http.get(this.getUrl, {headers: new HttpHeaders({'Authorization':'Bearer ' + sessionStorage.getItem('userToken')})});
  }

  updateDetails(data){
    return  this.http.post(this.updateUrl, data, {headers: new HttpHeaders({'Authorization':'Bearer ' + sessionStorage.getItem('userToken')})});
  }

}
