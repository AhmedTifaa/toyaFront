import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyFavouritesService {

  url:string = "http://localhost:8000/api/favoriteProduct/";
  deleteUrl:string;
  lang:string;
  constructor(private http:HttpClient) { }

  getProduct(){
    return this.http.get(this.url, {headers: new HttpHeaders({'Authorization':'Bearer ' + sessionStorage.getItem('userToken'), 'X-Localization': this.lang })});
  }

  deleteProduct(){
    return this.http.delete(this.deleteUrl, {headers: new HttpHeaders({'Authorization':'Bearer ' + sessionStorage.getItem('userToken'), 'X-Localization': this.lang })});
  }
}
