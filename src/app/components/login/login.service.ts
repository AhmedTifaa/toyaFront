import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

    url:string = "http://localhost:8000/api/login";
    islogin:any = false;
    private loginStatus = new BehaviorSubject(this.islogin);
    hasLogin:any = this.loginStatus.asObservable;

    constructor(private http:HttpClient){

    }
    login(data){
      // console.log(data);
      return  this.http.post(this.url,data);
    }

    checkLogin(dataLogin){
      this.loginStatus.next(dataLogin);
    }
}
