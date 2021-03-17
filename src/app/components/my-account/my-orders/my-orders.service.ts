import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyOrdersService {

  getUrl:string = "http://localhost:8000/api/order";
  cancelUrl:string;
  constructor(private http:HttpClient) {

  }

  getOrders(){
    return  this.http.get(this.getUrl, {headers: new HttpHeaders({'Authorization':'Bearer ' + sessionStorage.getItem('userToken')})});
  }

  cancelOrders(){
    return  this.http.post(this.cancelUrl, "",{headers: new HttpHeaders({'Authorization':'Bearer ' + sessionStorage.getItem('userToken')})});
  }

}
